var read = require('read-file');
var path = require('path');
var fs = require('fs');

var AddMigrationPackageCommand = function () {
  var _preferredPackage = 'percolate:migrations';

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, '.meteor');

    return componentRoot;
  }

  var handle = function () {
    var workingDirectory = process.cwd();
    var packagePath = path.join(_createPath(workingDirectory), 'packages');
    // Read the .meteor/packages
    var packagesFile = read.sync(packagePath, {encoding: 'UTF-8'});

    if (packagesFile.indexOf(_preferredPackage) === -1) {
      var packageAppend = '\n' + _preferredPackage + '\n';
      fs.appendFile(packagePath, packageAppend, function (err) {
        if (err) console.log(err);
      });
    }
  };

  return {
    handle: handle
  }
};

module.exports = AddMigrationPackageCommand;


