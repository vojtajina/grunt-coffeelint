module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffeelint: {
      one: {
        files: ['test/fixtures/*.coffee'],
        options: {
          indentation: {
            value: 2,
            level: "warn"
          },
          "no_trailing_semicolons": {
            level: "warn"
          }
        }
      },
      two: ['test/fixtures/correct.coffee', 'test/fixtures/some.coffee']
    },
    coffeelintOptions: {

    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'coffeelint');
};
