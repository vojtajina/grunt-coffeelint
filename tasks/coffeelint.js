module.exports = function(grunt) {
  var coffeelint = require('coffeelint');

  grunt.registerMultiTask('coffeelint', 'Validate files with CoffeeLint', function() {
    var options = this.data.options || grunt.config('coffeelintOptions') || {};
    var errorCount = 0;

    this.filesSrc.forEach(function(file) {
      grunt.verbose.writeln('Linting ' + file + '...');
      var errors = coffeelint.lint(grunt.file.read(file), options);
      
      if (!errors.length) {
        grunt.verbose.ok();
      } else {
        errors.forEach(function(error) {
          var status = "[warn]".yellow;
          if(/error/.test(error.level)){
            errorCount += 1;
            status = "[error]".red;
          }
          grunt.log.writeln(status + ' ' +file + ':' + error.lineNumber + ' ' + error.message + ' (' + error.rule + ')');
        });
      }
    });
    
    if(!errorCount){
      grunt.log.write("Lint free");
    } else {
      return false;
    }
  });
};
