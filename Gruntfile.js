var child_process = require('child_process'),
    fs = require('fs');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    clean: ["dist", "grafana-plugin-link-singlestat"],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: [ 'plugin.json', 'README.md' ],
        dest: 'dist',
      },
      zip: {
        cwd: 'dist',
        expand: true,
        src: ['**/*'],
        dest: 'grafana-plugin-link-singlestat',
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ["es2015"],
        plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    }

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:pluginDef', 'babel']);
  grunt.registerTask('zip', ['default', 'copy:zip', 'zip-create', 'clean']);
  grunt.registerTask('zip-create', 'Create a release ZIP file (needs version number)', function() {
    var jsonData = fs.readFileSync("plugin.json");
    var version = JSON.parse(jsonData).info.version;
    grunt.log.writeln('zip -9r "grafana-plugin-link-singlestat-' + version + '.zip" grafana-plugin-link-singlestat/');
    child_process.execSync('zip -9r "grafana-plugin-link-singlestat-' + version + '.zip" grafana-plugin-link-singlestat/');
  });
};
