'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.initConfig({
    coffee: {
      directives: {
          expand: true,
          cwd: 'src/',
          src: ['*.coffee', '!.*#.coffee'],
          dest: 'build/',
          ext: '.js'
      },
      utils: {
        options: {
          bare: true
        },
        expand: true,
        cwd: 'src/utils',
        src: ['*.coffee', '!.*#.coffee'],
        dest: 'build/utils/',
        ext: '.js'
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.less', '!.*#.less'],
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
    copy: {
      main: {
        src: 'img/*',
        dest: 'build/'
      }
    },
    clean: ['build/**/*'],
    concat: {
      js: {
        src: ['build/utils/*.js', '<%= ngtemplates.app.dest %>', 'build/*.js'],
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
  grunt.registerTask('build', ['clean', 'coffee', 'less', 'ngtemplates', 'concat:js', 'concat:css', 'copy']);
};
