const materialColors = require('material-colors-object');
const compatColors = require('../lib/compat');

const keys = Object.keys;

function reduceColorShades(color) {
  const colorShadeReducer = (acc, shadeKey) => {
    acc[shadeKey] = color.shades[shadeKey].value;
    return acc;
  }
  return keys(color.shades).reduce(colorShadeReducer, {});
}

function reduceColorSet(colorSet) {
  const colorReducer = (acc, colorKey) => {
    // Rename gray -> grey for backward-compatibility
    acc[colorKey.replace('gray', 'grey')] =
      colorSet[colorKey].shades
      ? reduceColorShades(colorSet[colorKey])
      : colorSet[colorKey].value;
    return acc;
  };
  return keys(colorSet).reduce(colorReducer, {});
}

module.exports = function(grunt) {
  grunt.registerTask('json', function () {
    // Cleanup
    const colorSet = reduceColorSet(materialColors);

    // Combine official colors with set from lib/compat.json
    Object.assign(colorSet, compatColors);

    // Write JSON file
    const json = JSON.stringify(colorSet, null, 2);
    grunt.file.write('dist/colors.json', json);
  });
};
