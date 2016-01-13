var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var fs = require('fs');

var AddMigrationRunnerCommand = function () {
  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'run-seeders.js.handlebars');
  }

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, 'server');

    return componentRoot;
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });
    var template = Handlebars.compile(raw);
    return template({});
  }

  var handle = function () {
    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);
    var runMigrationPath = path.join(base, 'RunSeeders.js');

    try {
      fs.accessSync(runMigrationPath, fs.F_OK)
    } catch (e) {
      var jsContent = _templatize(_templatePath());

      var workingDirectory = process.cwd();
      var base = _createPath(workingDirectory);
      write.sync(runMigrationPath, jsContent);
    }
  };

  return {
    handle: handle
  }
};

module.exports = AddMigrationRunnerCommand;


