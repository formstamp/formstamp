'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');

	grunt.initConfig({
		coffee: {
			compile: {
				files: {
					'build/chz.js': 'src/chz.coffee',
					'build/calendar.js': 'src/calendar.coffee',
					'build/popup.js': 'src/popup.coffee'
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
			sources: {
				files: ['src/**/*.coffee', 'styles/**/*.less'],
				tasks: ['build'],
				options: {
					events: ['changed', 'added'],
					nospawn: true
				}
			}
    },
    ngtemplates: {
      app: {
        src: 'templates/*.html',
        dest: 'build/templates/templates.js',
        options: {
          module: 'angular-w',
          prefix: '/',
          standalone: true
        }
      }
    },
    clean: ['build/**/*'],
    concat: {
      app: {
        src: ['<%= ngtemplates.app.dest %>', 'build/*.js'],
        dest: 'build/angular-w.js'
      }
    }
	})
	grunt.registerTask('build', ['clean', 'coffee', 'less', 'ngtemplates', 'concat']);
};
