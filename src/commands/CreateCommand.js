var spawn = require('child_process').spawn;

var CreateCommand = function (name) {
  var handle = function () {
    var workingDirectory = process.cwd();
    if (name == null || name == '') {
      console.log('A name is required');
      throw new Error('kitty create Name');
    }

    console.log('TODO');
  };

  return {
    handle: handle
  };
};

module.exports = CreateCommand;
