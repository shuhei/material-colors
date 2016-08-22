var https = require('https');
var util = require('util');
var cheerio = require('cheerio');

// Create an Object from an Array of objects.
function toObject(objects, keyName, valueName) {
  return objects.reduce(function(acc, obj) {
    acc[obj[keyName]] = obj[valueName];
    return acc;
  }, {});
}

function parse(html) {
  var $ = cheerio.load(html);

  function pickColor(_i, item) {
    var $item = $(item);
    var shade = $item.find('.shade').text().toLowerCase();
    var hex = $item.find('.hex').text();
    return { shade: shade, hex: hex };
  }

  function pickGroupColors(_i, group) {
    var $group = $(group);
    var colorName = $group.find('li.main-color .name').text();
    var name = colorName.toLowerCase().split(' ').join('-');
    var $items = $group.find('li.color:not(.main-color)');
    var groupColors = $items.map(pickColor).get();
    var colors = toObject(groupColors, 'shade', 'hex');
    return { name: name, colors: colors };
  }

  function toRGBA(baseColor, opacity) {
    return 'rgba(' + baseColor
      .substr(1)
      .replace(/[\da-f]{2}/ig, function(n) {
        return Number.parseInt(n, 16) + ', ';
      }) + opacity + ')';
  }

  function pickTextColor(baseColor) {
    return function(_i, item) {
      var $item = $(item);
      var $cols = $item.find('> td');
      var name = $cols.first().text().split(' ')[0].toLowerCase();
      var opacity = Number.parseInt($cols.last().text(), 10) / 100;
      var rgbaColor = toRGBA(baseColor, opacity);
      return { name: name, color: rgbaColor };
    };
  }

  function pickTextGroups(_i, group) {
    var $group = $(group);
    var colorName = $group.find('> tr:first-child > td:first-child').text();
    var name = colorName.replace(/ \(.+/, '').replace(' ', '-').toLowerCase();
    var baseColor = colorName.replace(/.+\((.+)\)/, '$1');
    var $items = $group.find('> tr:nth-child(1n+2)');
    var groupColors = $items.map(pickTextColor(baseColor)).get();
    var colors = toObject(groupColors, 'name', 'color');
    return { name: name, colors: colors };
  }

  var $groups = $('.color-group');
  var colorGroups = $groups.map(pickGroupColors).get();
  var $textGroups = $('.s-tag-table > tbody');
  var textGroups = $textGroups.map(pickTextGroups).get();

  var colorSet = toObject(colorGroups.concat(textGroups), 'name', 'colors');
  // Put black and white at the top level.
  if ('' in colorSet) {
    util._extend(colorSet, colorSet['']);
    delete colorSet[''];
  }
  return colorSet;
}

function fetch(callback) {
  https.get('https://material.google.com/style/color.html', function(res) {
    if (res.statusCode !== 200) {
      callback('Status code: ' + res.statusCode);
      return;
    }

    var html = '';
    res.setEncoding('utf8');
    res.on('readable', function() {
      html += res.read();
    });
    res.on('end', function() {
      var colorSet = parse(html);
      callback(null, colorSet);
    });
    res.on('error', callback);
  }).on('error', callback);
}

module.exports = fetch;
