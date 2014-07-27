function generate(grunt, fileType) {
  var colorSet = grunt.file.readJSON('dist/colors.json');
  var tmpl = grunt.file.read('templates/' + fileType + '.tmpl');
  var data = { colorSet: colorSet };
  var generated = grunt.template.process(tmpl, { data: data });
  grunt.file.write('dist/colors.' + fileType, generated);
}

module.exports = function(grunt) {
  var fileTypes = ['css', 'sass', 'scss', 'less', 'styl'];
  fileTypes.forEach(function(fileType) {
    grunt.registerTask(fileType, function() {
      generate(grunt, fileType);
    });
  });
};
