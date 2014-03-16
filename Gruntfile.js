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
  grunt.loadNpmTasks('grunt-selenium-webdriver');
  grunt.loadNpmTasks('grunt-express');

  var serverPort = 17405;
  if (process.env.TRAVIS) serverPort = 8000;

  var protractorConf = function(browser) {
    var args = {};

    args.baseUrl = 'http://localhost:' + serverPort + '/test/e2e/views/';
    args.browser = browser;
    args.specs = grunt.option('specs') || ['test/build/e2e/*Spec.js'];

    if (process.env.TRAVIS && browser != 'phantomjs') {
      args.sauceUser = process.env.SAUCE_USERNAME;
      args.sauceKey = process.env.SAUCE_ACCESS_KEY;
      config.capabilities = {
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
      }
    } else {
      // Chrome is not running wirh grunt-selenium-webdriver.
      // Make it run on his own.
      if (browser != 'chrome')
        args.seleniumAddress = 'http://localhost:4444/wd/hub';
    }

    return {
      options: {
        keepAlive: false,
        'args': args
      }
    }
  };

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
      options: { },
      phantomjs: protractorConf('phantomjs'),
      chrome: protractorConf('chrome'),
      firefox: protractorConf('firefox')
    },
    express: {
      server: {
        options: {
          port: serverPort,
          bases: __dirname
        }
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

  grunt.registerTask('express:perm', ['express', 'express-keepalive'])
  grunt.registerTask('test:e2e', 'test:e2e:phantomjs')

  grunt.registerTask('test:e2e:phantomjs',
                     ['clean:e2e', 'coffee:e2e', 'express',
                      'selenium_phantom_hub', 'protractor:phantomjs', 'selenium_stop'])

  grunt.registerTask('test:e2e:chrome',
                     ['clean:e2e', 'coffee:e2e', 'express',
                      'protractor:chrome'])

  grunt.registerTask('test:e2e:firefox',
                     ['clean:e2e', 'coffee:e2e', 'express',
                      'selenium_start', 'protractor:firefox', 'selenium_stop'])
};
