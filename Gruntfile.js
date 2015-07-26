module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: true,
        modules: "system",
        keepModuleIdExtensions: true
      },
      build: {
        files: {
          "build/js/sprite-sheet.js": "app/js/sprite-sheet.js",
          "build/js/sprite.js": "app/js/sprite.js",
          "build/js/util.js": "app/js/util.js",
          "build/js/item.js": "app/js/item.js"
        }
      },
      test: {
        files: {
          "build/test/index.js": "app/test/index.js",
          "build/test/sprite-sheet.js": "app/test/sprite-sheet.js",
          "build/test/sprite.js": "app/test/sprite.js",
          "build/test/util.js": "app/test/util.js",
          "build/test/item.js": "app/test/item.js",
          "build/test/sprites/guybrush.js": "app/test/sprites/guybrush.js"
        }
      }
    },
    "watch": {
      babel: {
        files: ["app/**/*.js"],
        tasks: ["babel","mocha"]
      }
    },
    "mocha": {
      dev: {
        options: {
          run: false,
          log: true,
          urls: ['test-runner.html'],
        }
      }
    }
  });
  
  grunt.registerTask("default", ["watch"]);
}