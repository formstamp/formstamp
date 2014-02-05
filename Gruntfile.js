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
          expand: true,     // Enable dynamic expansion.
          cwd: 'src/',      // Src matches are relative to this path.
          src: ['**/*.coffee'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.js'   // Dest filepaths will have this extension.
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.less'],
          dest: 'build',
          ext: '.css'
        }]
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
