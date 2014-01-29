'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		coffee: {
			compile: {
				files: {
					'build/chz.js': 'src/chz.coffee',
					'build/calendar.js': 'src/calendar.coffee'
				}
			}
		},
		less: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'styles',
						src: ['*.less'],
						dest: 'build',
						ext: '.css'
					}
				]
			}
		},
		watch: {
			options: {
				nospawn: true
			},
			coffee: {
				files: ['src/**/*.coffee'],
				tasks: ['coffee'],
				options: {
					events: ['changed', 'added'],
					nospawn: true
				}
			},
			sass: {
				files: ['styles/**/*.less'],
				tasks: ['sass'],
				options: {
					events: ['changed', 'added'],
					nospawn: true
				}
			}
		}
	})
	grunt.registerTask('default');
};
