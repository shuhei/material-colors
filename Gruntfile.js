module.exports = function(grunt) {
  grunt.initConfig({
    json: {
      options: {
        dest: 'colors.json'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['json', 'css', 'sass', 'scss', 'less']);
};
