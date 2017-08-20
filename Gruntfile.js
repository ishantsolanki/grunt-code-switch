/*
 * grunt-code-switch
 * https://github.com/ishant.solanki/grunt-code-switch
 *
 * Copyright (c) 2017 Ishant Solanki
 * Licensed under the MIT license.
 */
(function() {
  'use strict';

  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      jshint: {
        all: [
          'Gruntfile.js',
          'tasks/*.js'
        ],
        options: {
          jshintrc: '<%= baseDir %>.jshintrc'
        }
      },

      // Before generating any new files, remove any previously-created files.
      clean: {
        tests: ['tmp']
      },

      // Configuration to be run (and then tested).
      code_switch: {
        default: {
          options: {
            environment: grunt.option('env') || 'dev',
            env_char: '#',
            blocks: [{
              code_tag: 'env:dev',
              grunt_option: 'dev'
            }, {
              code_tag: 'env:prod',
              grunt_option: 'prod'
            }]
          },
          files: {
            'test/fixtures/sample.js': 'test/fixtures/sample.js',
            'test/fixtures/index.html': 'test/fixtures/index.html'
          }
        }
      },

      // Unit tests.
      nodeunit: {
        tests: ['test/*.test.js']
      }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'code_switch', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

  };
})();