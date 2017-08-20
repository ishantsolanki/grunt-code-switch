/*
 * grunt-code-switch
 * https://github.com/ishant.solanki/grunt-code-switch
 *
 * Copyright (c) 2015 Ishant Solanki
 */
(function () {
	'use strict';

	module.exports = function(grunt) {

		// Please see the Grunt documentation for more information regarding task
		// creation: http://gruntjs.com/creating-tasks

		grunt.registerMultiTask('code_switch', 'Use to switch between previously defined HTML and JS comment blocks in project files to change based on specified parameters', function() {
			// Merge task-specific and/or target-specific options with these defaults.
			var options = this.options();
			var blocking_char = ((options.env_char) ? options.env_char : '#');
			var blocks = options.blocks;
			var valid = false;
			blocks.map(function(block) {
				if (block.grunt_option === options.environment) {
					valid = true;
				}
			});
			if (!valid) {
				var message = 'Specified parameter ' + options.environment + ' is invalid.';
				grunt.fail.warn(message);
				return;
			}
			// Iterate over all specified files.
			this.files.forEach(function(f) {
				var out = f.src.map(function(src) {
					var result = grunt.file.read(src, "utf8");
					blocks.map(function(block) {
						if (block.grunt_option === options.environment) {
							grunt.selected_option = block.code_tag;
							// replace code blocks in HTML files
							result = result.replace(new RegExp("<\!-- " + block.code_tag + " --" + blocking_char + ">", "gi"), "<!-- " + block.code_tag + " -->");
							// replace blocks in JS files
							result = result.split("/* " + block.code_tag + " *" + blocking_char + "/").join("/* " + block.code_tag + " */");
						} else {
							// replace code blocks in HTML files
							result = result.replace(new RegExp("<\!-- " + block.code_tag + " -->", "gi"), "<!-- " + block.code_tag + " --" + blocking_char + ">");
							// replace blocks in JS files
							result = result.split("/* " + block.code_tag + " */").join("/* " + block.code_tag + " *" + blocking_char + "/");
						}
					});
					return result;
				});
				grunt.log.writeln(f.dest + ' => ' + grunt.selected_option);
				grunt.file.write(f.dest, out);
			});
		});

	};
})();