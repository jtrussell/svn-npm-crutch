"use strict";

module.exports = function(grunt) {

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      gruntfile: {
        src: "Gruntfile.js"
      },
      lib: {
        src: ["lib/**/*.js"]
      },
      scripts: {
        src: ["scripts/**/*.js"]
      },
			index: {
				src: ["index.js"]
			}
    },

		nodeunit: {
			all: ["test/*_test.js"]
		}
  });

	grunt.registerTask( "test", ["nodeunit"] );
  grunt.registerTask( "default", [
		"jshint"
	]);

};
