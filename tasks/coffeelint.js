module.exports = function(grunt) {
  var coffeelint = require('coffeelint');

  grunt.registerMultiTask('coffeelint', 'Validate files with CoffeeLint', function() {

    var files = this.filesSrc;
    var options = this.options({
      force: false,
      growl: false
    });
    var errorCount = 0;
    var warnCount = 0;

    var growl;
    if (options.growl) {
      growl = require('growl');
    }

    files.forEach(function(file) {
      grunt.verbose.writeln('Linting ' + file + '...');

      var errors = coffeelint.lint(grunt.file.read(file), options);

      if (!errors.length) {
        return grunt.verbose.ok();
      }

      errors.forEach(function(error) {
        var status, message;

        if (error.level === 'error') {
          errorCount += 1;
          status = "[error]".red;
        } else if (error.level === 'warn') {
          warnCount += 1;
          status = "[warn]".yellow;
        } else {
          return;
        }

        message = file + ':' + error.lineNumber + ' ' + error.message +
            ' (' + error.rule + ')';

        grunt.log.writeln(status + ' ' + message);
        grunt.event.emit('coffeelint:' + error.level, error.level, message);
        grunt.event.emit('coffeelint:any', error.level, message);

        if (options.growl) {
          growl(message, {title: "Coffeelint "+error.level, sticky: true});
        }
      });
    });

    if (errorCount && !options.force) {
      return false;
    }

    if (!warnCount && !errorCount) {
      grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') +
          ' lint free.');
    }
  });
};
