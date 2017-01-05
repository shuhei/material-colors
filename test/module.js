var fs = require('fs');
var path = require('path');
var os = require('os');
var execSync = require('child_process').execSync;

var node = process.argv[0];
var fixtures = fs.readdirSync(path.join(__dirname, 'fixtures'));
var failed = false;
fixtures.forEach(function (fixture) {
  var filename = path.join(__dirname, 'fixtures', fixture);
  var command = [
    path.join(__dirname, '..', 'node_modules', '.bin', 'rollup'),
    '-f es',
    filename,
    '|',
    node
  ].join(' ');
  var stdout = execSync(command).toString();
  if (stdout === '#ffebee' + os.EOL) {
    console.error('OK', fixture);
  } else {
    failed = true;
    console.error('NG', fixture, ':', stdout);
  }
});
if (failed) {
  process.exit(1);
}
