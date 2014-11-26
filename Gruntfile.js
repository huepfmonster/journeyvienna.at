module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    /* Configuration Variables */

    source: 'src',
    distribution: 'dist',
    pkg: grunt.file.readJSON('package.json'),

    /* Plugin Configuration */

    assemble: {
      options: {
        assets: '<%= distribution %>/assets',
        collections: [
          {
            name: 'event',
            sortby: 'date',
            sortorder: 'descending'
          }
        ],
        data: '<%= source %>/data/*.{yaml,json}',
        partials: '<%= source %>/partials/*.{hbs,md}'
      },
      en: {
        options: {
          language: 'en'
        },
        dest: '<%= distribution %>/index.html',
        src: '<%= source %>/content/index.hbs'
      },
      de: {
        options: {
          language: 'de'
        },
        dest: '<%= distribution %>/de/index.html',
        src: '<%= source %>/content/index.hbs'
      }
    },

    clean: {
      dist: {
        src: '<%= distribution %>'
      }
    },

    connect: {
      serve: {
        options: {
          port: 3000,
          livereload: 35729,
          base: '<%= distribution %>/',
          open: true
        }
      }
    },

    copy: {
      assets: {
        cwd: '<%= source %>/',
        expand: true,
        src: [
          'assets/**/*',
          '!assets/css/**/*',
          '!assets/js/**/*'
        ],
        dest: '<%= distribution %>/'
      }
    },

    imagemin: {
      all: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: '<%= distribution %>/',
            src: ['**/*.{jpg,png}'],
            dest: '<%= distribution %>/'
          }
        ]
      }
    },

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      scripts: {
        src: '<%= source %>/**/*.js'
      } 
    },

    less: {
      compressed: {
        options: {
          cleancss: true
        },
        dest: '<%= distribution %>/assets/css/styles.css',
        src: [
          '<%= source %>/assets/css/pure-0.5.0/base.css',
          '<%= source %>/assets/css/pure-0.5.0/buttons.css',
          '<%= source %>/assets/css/pure-0.5.0/forms.css',
          '<%= source %>/assets/css/pure-0.5.0/grids.css',
          '<%= source %>/assets/css/pure-0.5.0/grids-responsive-min.css',
          '<%= source %>/assets/css/pure-0.5.0/menus-core.css',
          '<%= source %>/assets/css/fonts.css',
          '<%= source %>/assets/css/icons.css',
          '<%= source %>/assets/css/custom.less'
        ]
      }     
    },

    uglify: {
      options: {
        compress: true,
        preserveComments: false
      },
      js: {
          dest: '<%= distribution %>/assets/js/scripts.js',
          src: [
            '<%= source %>/assets/js/html5shiv.js',
            '<%= source %>/assets/js/respond.js'
          ]
      } 
    },

    watch: {
      options: {
        livereload: 35729,
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile',
      },
      content: {
        files: '<%= source %>/**/*.{hbs,md,json,yaml}',
        tasks: ['assemble']
      },
      css: {
        files: '<%= source %>/**/*.{css,less}',
        tasks: 'less'
      },
      js: {
        files: '<%= source %>/**/*.js',
        tasks: ['jshint:scripts', 'uglify']
      },
      assets: {
        files: '<%= source %>/**/*.{jpg,png,woff}',
        tasks: 'copy'
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build', [
    'jshint',
    'clean',
    'copy',
    'assemble',
    'less',
    'uglify',
    'imagemin'
  ]);
 
  grunt.registerTask('serve', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};