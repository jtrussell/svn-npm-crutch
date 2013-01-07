var fs = require( "fs" )
	, cp = require( "child_process" )
	, async = require ( "async" )
	, rimraf = require( "rimraf" )
	, rootDir = __dirname + "/../../.."
	, pkg = require( rootDir + "/package.json" )
	, deps = pkg.svnDependencies || {}
	, dep = ""
	, mkdirs
	, svnCheckout
	, svnUpdate
	, npmInstall
	, cleanup
	, errors = []
	, numDeps = Object.keys( deps ).length
	;

mkdirs = function( dep ) {
	return function( callback ) {
		async.waterfall([
				// Check if we already have a node_modules folder (we should)
				function( cb ) {
					fs.exists( rootDir + "/node_modules", function( exists ) {
						cb( null, exists );
					});
				},

				// Make the node_modules folder if we need to
				function( exists, cb ) {
					if( !exists ) {
						fs.mkdir( rootDir + "/node_modules", function( error ) {
							cb( error );
						});
					} else {
						cb( null );
					}
				}
				
				// ,

				// -----------------------------------------------------
				// [todo]
				// This kinda sucks for our purposes but the .svn files are ignored or
				// deleted at the end of the process... I need to investigate this
				// further but I suspect it has something to do with with npm not
				// wanting to keepa round version control files/folders. For now we'll
				// need to just remove the svn dependencies for a full checkout each
				// time to make sure we correctly get module updates
				//
				// UPDATE: Is this fixed by installing fron a different dir than the app
				// root?
				// [/todo]
				// -----------------------------------------------------

				//function( cb ) {
				//	fs.exists( rootDir + "/node_modules/" + dep, function( exists ) {
				//		cb( null, exists );
				//	});
				//},

				//function( exists, cb ) {
				//	if( exists ) {
				//		rimraf( rootDir + "/node_modules/" + dep, function( error ) {
				//			cb( error );
				//		});
				//	} else {
				//		cb( null );
				//	}
				//}

			],
			
			// Final call back
			function( error ) {
				callback( error );
			}
		);
	};
};

svnCheckout = function( dep ) {
	return function( callback ) {
		console.log( "---> Installing " + dep + " from svn..." );
		cp.exec( "svn co " + deps[dep] + " " + dep, {
			stdio: "inherit",
			cwd: rootDir + "/node_modules/"
		}).on( "exit", function( error, stdout, stderr ) {
			var errMsg = error ? "svn checkout failed" : null;
			callback( errMsg );
		});
	};
};

svnUpdate = function( dep ) {
	return function( callback ) {
		console.log( "--> Making sure " + dep + " is up to date..." );
		cp.exec( "svn update", {
			stdio: "inherit",
			cwd: rootDir + "/node_modules/" + dep
		}).on( "exit", function( error, stdout, stderr ) {
			var errMsg = error ? "svn update failed" : null;
			callback( errMsg );
		});
	};
};

npmInstall = function( dep ) {
	return function( callback ) {
		console.log( "-> Running `npm install` on " + dep + "..." );
		cp.exec( "npm install", {
			stdio: "inherit",
			cwd: rootDir + "/node_modules/" + dep
		}).on( "exit", function( error, stdout, stderr ) {
			var errMsg = error ? "npm install failed" : null;
			callback( errMsg );
		});
	};
};

cleanup = function( dep ) {
	return function( error ) {
		if( error ) {
			console.log( "=> Failed to install " + dep );
			errors.push( dep + " (" + error + ")" );
		} else {
			console.log( "=> Sucessfully installed " + dep );
		}

		if( 0 === --numDeps ) {
			console.log( "" );
			console.log( "============================================" );
			if( errors.length ) {
				console.log( "Encountered errors installing svn dependencies:" );
				errors.forEach( function( err ) {
					console.log( " * " + err );
				});
			} else {
				console.log( "==> Finished installing svn dependencies" );
			}
			console.log( "============================================" );
		}
	};
};

for( dep in deps ) {
	if( deps.hasOwnProperty( dep ) ) {
		async.series([
				mkdirs( dep ),
				svnCheckout( dep ),
				svnUpdate( dep ),
				npmInstall( dep )
		], cleanup( dep ) );
	}
}
