var spawn = require('child_process').spawn;

var SeedDatabaseCommand = function () {
  var handle = function () {
    var env = Object.create(process.env);

    env.METEOR_ENV = 'seed';

    var start = spawn('meteor', ['-p', '8765'], {env: env});

    start.stdout.pipe(process.stdout);
  };

  return {
    handle: handle
  }
};

module.exports = SeedDatabaseCommand;
