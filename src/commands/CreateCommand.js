var copy = require('recursive-copy');
var path = require('path');

var CreateCommand = function (name) {
  var handle = function () {
    var workingDirectory = process.cwd();
    if (name == null || name == '') {
      console.log('A name is required');
      throw new Error('kitty create Name');
    }

    console.log('Creating ' + name);

    var src = path.join(__dirname, '..', 'scaffolding', 'project');
    var dest = path.join(workingDirectory, name);

    copy(src, dest, {
      dot: true
    }, function(error, results) {
      if (error) {
        console.error('Creation failed: ' + error);
      } else {
        console.info('Creation succeeded');
      }
    });
  };

  return {
    handle: handle
  };
};

module.exports = CreateCommand;
