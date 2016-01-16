var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var fs = require('fs');
var MakeUtilities = require('../utilities/MakeUtilities');

var MakeTestCommand = function () {
  var _arguments = Array.prototype.slice.call(arguments);
  var _name = (_arguments.length > 1 ? _arguments[1] : _arguments[0] );
  var _nameDashed = MakeUtilities.camelToDash(_name);

  var _testRunner = 'jasmine';
  var _typeOfTest = 'integration';

  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'test-spec.js.handlebars');
  }

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, 'test', _testRunner);

    if (_typeOfTest === 'integration') {
      componentRoot = path.join(componentRoot, 'client');
    } else if (_typeOfTest === 'unit' ) {
      componentRoot = path.join(componentRoot, 'server');
    }

    componentRoot = path.join(componentRoot, _typeOfTest);

    return componentRoot;
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });
    var template = Handlebars.compile(raw);
    return template({
      name: _name,
      nameDashed: _nameDashed
    });
  }

  var handle = function (flags) {
    _typeOfTest = (function () {
      if (flags.indexOf('--integration') !== -1) {
        return 'integration';
      } else if (flags.indexOf('--unit') !== -1) {
        return 'unit';
      } else {
        return 'integration';
      }
    })();

    var jsContent = _templatize(_templatePath());

    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);

    write.sync(path.join(base, _name + '-spec.js'), jsContent);
  };

  return {
    handle: handle
  }
};

module.exports = MakeTestCommand;
