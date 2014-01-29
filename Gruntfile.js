'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-haml');
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
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'styles',
						src: ['*.scss'],
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
				files: ['styles/**/*.scss'],
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
