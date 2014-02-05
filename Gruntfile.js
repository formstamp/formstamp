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
					'build/datepicker.js': 'src/datepicker.coffee',
					'build/date-format.js': 'src/date-format.coffee',
					'build/popup.js': 'src/popup.coffee',
          'build/multi-select.js': 'src/multi-select.coffee',
          'build/focus.js': 'src/focus.coffee',
          'build/combo.js': 'src/combo.coffee'
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
      js: {
        src: ['<%= ngtemplates.app.dest %>', 'build/*.js'],
        dest: 'build/angular-w.js'
      },
      css: {
        src: ['build/*.css'],
        dest: 'build/angular-w.css'
      }
    },
		watch: {
			options: {
				nospawn: true
			},
			sources: {
				files: ['src/**/*.coffee', 'styles/**/*.less', 'templates/**/*.html'],
				tasks: ['build'],
				options: {
					events: ['changed', 'added'],
					nospawn: true
				}
			}
    }
	})
	grunt.registerTask('build', ['clean', 'coffee', 'less', 'ngtemplates', 'concat:js', 'concat:css']);
};
