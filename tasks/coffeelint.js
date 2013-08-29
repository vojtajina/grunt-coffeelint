module.exports = function(grunt) {
  var coffeelint = require('coffeelint');

  grunt.registerMultiTask('coffeelint', 'Validate files with CoffeeLint', function() {

    var errorCount = 0;
    var warnCount = 0;
    var files = this.filesSrc;
    var options = this.options();

    if (options.configFile != undefined) {
      var config = grunt.file.readJSON(options.configFile);
      options.configFile = undefined;
      for (var key in options) {
          config[key] = options[key];
      }
      options = config;
    }

    files.forEach(function(file) {
      grunt.verbose.writeln('Linting ' + file + '...');

      var literate = !!file.match(/\.(litcoffee|coffee\.md)$/i);
      var errors = coffeelint.lint(grunt.file.read(file), options, literate);

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
      });
    });

    if (errorCount && !options.force) {
      return false;
    }

    if (!warnCount && !errorCount) {
      grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
    }
  });
};
