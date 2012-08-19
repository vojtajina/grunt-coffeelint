module.exports = function(grunt) {
  var coffeelint = require('coffeelint');

  grunt.registerMultiTask('coffeelint', 'Validate files with CoffeeLint', function() {

    var files = grunt.file.expandFiles(this.data.files || this.data);
    var options = this.data.options || grunt.config('coffeelintOptions') || {};

    files.forEach(function(file) {
      grunt.log.writeln('Linting ' + file + '...');
      var errors = coffeelint.lint(grunt.file.read(file), options);

      if (!errors.length) {
        grunt.log.ok('Lint free.')
      } else {
        errors.forEach(function(error) {
          grunt.log.error(file + ':' + error.lineNumber + ' ' + error.message + ' (' + error.rule + ')');
        });
      }
    });
  });
};
