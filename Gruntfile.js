'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks( "grunt-contrib-jshint" );

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      scripts: {
        src: ['scripts/**/*.js']
      },
			index: {
				src: ['index.js']
			}
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
