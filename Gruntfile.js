'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    coffee: {
      compile: {
        files: { 'build/chz.js': 'src/chz.coffee' }
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
      }
    }
  })
  grunt.registerTask('default');
};
