var cp = require( "child_process" )
	, rootDir = "../.."
	, pkg = require( rootDir + "/package.json" )
	, deps = pkg.svnDependencies || {}
	, dep = ""
	, install
	, numDeps = Object.keys( deps ).length
	;

// -----------------------------------------------------
// Returns a callback to perform an npm install for a given module once it has
// been pulled down from subversion
// -----------------------------------------------------
install = function( dep ) {
	return function() {
		console.log( "-> Running `npm install` for svn dependency: " + dep );
		cp.exec( "npm install ./node_modules/" + dep, {
			stdio: "inherit",
			cwd: rootDir
		}, function() {
			console.log( "Finished install svn dependency: " + dep );
			if( 0 === --numDeps ) {
				console.log( "==> Finished installing all svn dependencies" );
			}
		});
	};
};

// -----------------------------------------------------
// Perform and svn checkout for each module
// -----------------------------------------------------
for( dep in deps ) {
	if( deps.hasOwnProperty( dep ) ) {
		console.log( "--> Installing svn dependency: " + dep + "..." );
		cp.exec( "svn co " + deps[dep] + " ./node_modules/" + dep, {
			stdio: "inherit",
			cwd: rootDir
		}).on( "exit", install( dep ) );
	}
}
