module.exports = function(grunt) {
  var coffeelint = require('coffeelint');

  grunt.registerMultiTask('coffeelint', 'Validate files with CoffeeLint', function() {

    var files = this.filesSrc;
    var options = this.options()
    var errorCount = 0;
    var warnCount = 0;

    files.forEach(function(file) {
      grunt.verbose.writeln('Linting ' + file + '...');

      var errors = coffeelint.lint(grunt.file.read(file), options);

      if (!errors.length) {
        grunt.verbose.ok();
      } else {
        errors.forEach(function(error) {
          var status;

          if (error.level === 'error') {
            errorCount += 1;
            status = "[error]".red;
          } else if (error.level === 'warn') {
            warnCount += 1;
            status = "[warn]".yellow;
          } else {
            return;
          }

          grunt.log.writeln(status + ' ' + file + ':' + error.lineNumber + ' ' + error.message + ' (' + error.rule + ')');
        });
      }
    });

    if (errorCount) {
      return false;
    }

    if (!warnCount) {
      grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
    }
  });
};
