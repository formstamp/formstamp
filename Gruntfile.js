'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    coffee: {
      main: {
        expand: true,
        cwd: 'src/fs',
        src: ['*.coffee', '!.*#.coffee'],
        dest: 'build/fs',
        ext: '.js'
      },
      demo: {
        options: { join: true },
        files: {
          'demo/js/app.js': 'demo/coffee/*.coffee'
        }
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
      },
      e2e: {
        expand: true,
        cwd: 'test/e2e/',
        src: ['./**/*.coffee', '!.*#.coffee'],
        dest: 'test/build/e2e',
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
          module: 'formstamp',
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
    clean: {
      main: ['build/**/*'],
      e2e: ['test/build/e2e/**/*']
    },
    concat: {
      js: {
        src: ['build/utils/*.js', '<%= ngtemplates.app.dest %>', 'build/fs/*.js'],
        dest: 'build/formstamp.js'
      },
      css: {
        src: ['build/*.css'],
        dest: 'build/formstamp.css'
      }
    },
    protractor: {
      options: {
        configFile: 'test/build/e2e/conf.js'
      },
      'default': { }
    },
    shell: {
      phantomjs: {
        command: './node_modules/.bin/phantomjs --webdriver=4444'
      }
    },
    watch: {
      main: {
        files: ['src/**/*.coffee', 'styles/**/*.less', 'templates/**/*.html', 'demo/coffee/*.coffee'],
        tasks: ['build'],
        options: {
          events: ['changed', 'added'],
          nospawn: true
        }
      },
      e2e: {
        files: ['test/e2e/**/*.coffee', 'test/e2e/views/**/*.html'],
        tasks: ['test:e2e'],
        options: {
          events: ['changed', 'added'],
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('build',
                     ['clean',
                      'coffee',
                      'less',
                      'ngtemplates',
                      'concat:js',
                      'concat:css',
                      'copy']);

  grunt.registerTask('test:e2e',
                     ['clean:e2e',
                      'coffee:e2e',
                      'protractor:default']);
  grunt.registerTask('phantomjs',
                     ['shell:phantomjs']);
};
