module.exports = function( hook ) {
	var fs = require( "fs" )
		, appPkg = __dirname + "/../../../package.json"
		, pkg = JSON.parse( fs.readFileSync( appPkg ).toString() )
		, installScripts = []
		, helperScript
		;

	// -----------------------------------------------------
	// Add a install hook for svn scripts if it isn't already there in the main
	// app's package.js
	// -----------------------------------------------------
	pkg.scripts = pkg.scripts || {};
	pkg.scripts.install = pkg.scripts.install || "";

	pkg.scripts.install.split( "&&" ).forEach( function( scrp ) {
		// -----------------------------------------------------
		// Clear out any older install scripts for svn-npm-crutch
		// -----------------------------------------------------
		if( -1 === scrp.indexOf( "node_modules/svn-npm-crutch" ) ) {
			scrp = scrp.trim();
			if( scrp.length > 0 ) {
				installScripts.push( scrp );
			}
		}
	});

	if( "install" === hook ) {
		helperScript = "node ./node_modules/svn-npm-crutch/lib/svn-npm-crutch.js";
		installScripts.push( helperScript );
	}

	pkg.scripts.install = installScripts.join( " && " );
	fs.writeFileSync( appPkg, JSON.stringify( pkg, null, "\t" ) );
};

