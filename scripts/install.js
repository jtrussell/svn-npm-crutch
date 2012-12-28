var fs = require( "fs" )
	, appPkg = "../../../package.json"
	, pkg = JSON.parse( fs.readFileSync( appPkg ).toString() )
	, installScripts
	, helperScript
	;

// -----------------------------------------------------
// Add a install hook for svn scripts if it isn't already there in the main
// app's package.js
// -----------------------------------------------------
pkg.scripts = pkg.scripts || {};
pkg.scripts.install = pkg.scripts.install || "";

installScripts = pkg.scripts.install.split( "&&" ).map( function( scrp ) {
	return scrp.trim();
});

helperScript = "node ./node_modules/svn-npm-crutch/lib/svn-npm-crutch.js";

if( -1 === installScripts.indexOf( helperScript ) ) {
	installScripts.push( helperScript );
	pkg.scripts.install = installScripts.join( " && " );
	fs.writeFileSync( appPkg, JSON.stringify( pkg ) );
}
