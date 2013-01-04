var cp = require( "child_process" )
	, async = require ( "async" )
	, rootDir = __dirname + "/../../.."
	, pkg = require( rootDir + "/package.json" )
	, deps = pkg.svnDependencies || {}
	, dep = ""
	, svnCheckout
	, svnUpdate
	, npmInstall
	, cleanup
	, errors = []
	, numDeps = Object.keys( deps ).length
	;

svnCheckout = function( dep ) {
	return function( callback ) {
		console.log( "---> Installing " + dep + " from svn..." );
		cp.exec( "svn co " + deps[dep] + " ./node_modules/" + dep, {
			stdio: "inherit",
			cwd: rootDir
		}).on( "exit", function( error, stdout, stderr ) {
			var errMsg = error ? "svn checkout failed" : null;
			callback( errMsg );
		});
	};
};

svnUpdate = function( dep ) {
	return function( callback ) {
		console.log( "--> Making sure " + dep + " is up to date..." );
		cp.exec( "svn update ./node_modules/" + dep, {
			stdio: "inherit",
			cwd: rootDir
		}).on( "exit", function( error, stdout, stderr ) {
			var errMsg = error ? "svn update failed" : null;
			callback( errMsg );
		});
	};
};

npmInstall = function( dep ) {
	return function( callback ) {
		console.log( "-> Running `npm install` on " + dep + "..." );
		cp.exec( "npm install ./node_modules/" + dep, {
			stdio: "inherit",
			cwd: rootDir
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
				svnCheckout( dep ),
				svnUpdate( dep ),
				npmInstall( dep )
		], cleanup( dep ) );
	}
}
