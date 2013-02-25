'use strict';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require( "fs" )
	, cp = require( "child_process" )
	, rimraf = require( "rimraf" )
	, npm = require( "npm" )
	, grunt = require( "grunt" )
	;

exports['svn_npm_crutch_tester'] = {
  setUp: function(done) {
		// -----------------------------------------------------
		// Eh, I'm too lazy for nice async code here. You're waiting for my setup
		// anyway right?
		// -----------------------------------------------------
		grunt.file.recurse( __dirname + "/tmp", function( f ) {
			grunt.file["delete"]( f, {force:true} );
		});

		grunt.file.mkdir( __dirname + "/tmp/node_modules" );

		grunt.file.copy(
				__dirname + "/artifacts/package.json",
				__dirname + "/tmp/package.json" );

		grunt.file.copy(
				__dirname + "/artifacts/README.md",
				__dirname + "/tmp/README.md" );

		// -----------------------------------------------------
		// This is a little weird... to be an honest test we need to install *this*
		// module fresh... and we'd rather not commit to github or publish to the
		// npm registry whenever we want to run a true test. Luckily npm has a
		// programmatic interface via the npm module (how meta) and we can install
		// directly from a folder
		// -----------------------------------------------------
		npm.load( function( err, npm ) {
			npm.commands.install(
				// -----------------------------------------------------
				// Where to install
				// -----------------------------------------------------
				__dirname + "/tmp",

				// -----------------------------------------------------
				// Package to install - this one!
				// -----------------------------------------------------
				__dirname + "/../.",

				// -----------------------------------------------------
				// Callback
				// -----------------------------------------------------
				done
			);
		});
  },

  "full subversion module checkout": function(test) {
    test.expect( 3 );

		test.ok(
			fs.existsSync( __dirname + "/tmp/node_modules" ),
			"Should have a node_modules folder" );

		test.ok(
			fs.existsSync( __dirname + "/tmp/node_modules/svn-npm-crutch-test" ),
			"Should have a svn-npm-crutch-test module (from subversion)" );

		var svnNpmCrutchTestResult = false;
		try {
			svnNpmCrutchTestResult = require( "./tmp/node_modules/svn-npm-crutch-test" ).test();
		} catch( e ) {
			// Don't die
		}

		test.equal(
			svnNpmCrutchTestResult,
			"HEY YOU GUYS!",
			"Should be able to require the svn module "
		);

		test.done();
  }
};
