var fs = require('fs');
var path = require('path');
var fetch = require('../lib/fetch');

module.exports = function(grunt) {
  grunt.registerTask('json', function() {
    var done = this.async();
    fetch(function(err, colorSet) {
      if (err) {
        grunt.log.writeln(err);
        done(false);
        return;
      }

      var json = JSON.stringify(colorSet, null, 2);
      var jsonPath = path.resolve(__dirname, '..', 'dist', 'colors.json');
      fs.writeFileSync(jsonPath, json);
      done();
    });
  });
};
