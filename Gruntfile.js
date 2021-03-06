module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // the package file to use
 
    uglify: {
      files: {
        expand: true, 
        flatten: true, 
        src: 'src/conway.js',
        dest: 'dist',
        ext: '.min.js'
      }
    },

    watch: {
      files: ['tests/*.js', 'tests/*.html', 'src/**'],
      tasks: ['default']
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },
      dist: {
        src: ['src/Conway/Canvas/*.js', 'src/Conway/Grid/*.js', 'src/Conway/Conway/*.js'],
        dest: 'src/conway.js'
      }
    },

    copy: {
      main: {
        files: [
          // copy src to example
          { expand: true, cwd: 'src/', src: 'conway.js', dest: 'public/js/' }
        ]
      }
    }
  });

  // load up your plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // register one or more task lists (you should ALWAYS have a "default" task list)
  grunt.registerTask('dist', ['concat', 'uglify', 'copy']);
  grunt.registerTask('default', ['dist', 'watch']);
};
