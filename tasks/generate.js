var fs = require('fs');
var path = require('path');

function generate(grunt, fileType) {
  var colorSet = require(path.resolve(__dirname, '..', 'dist', 'colors.json'));
  var templatePath = path.resolve(__dirname, '..', 'templates', fileType + '.tmpl');
  var tmpl = fs.readFileSync(templatePath, { encoding: 'utf8' });
  var data = { colorSet: colorSet };
  var css = grunt.template.process(tmpl, { data: data });
  fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'colors.' + fileType), css);
}

module.exports = function(grunt) {
  var fileTypes = ['css', 'sass', 'scss', 'less'];
  fileTypes.forEach(function(fileType) {
    grunt.registerTask(fileType, function() {
      generate(grunt, fileType);
    });
  });
};
