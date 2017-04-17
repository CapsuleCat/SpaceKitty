var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var fs = require('fs');
var MakeUtilities = require('../utilities/MakeUtilities');

var MakeContainerCommand = function () {
  var _arguments = Array.prototype.slice.call(arguments);
  var _namespace = (_arguments.length > 1 ? _arguments[0] : '');
  var _namespaceDashed = MakeUtilities.camelToDash(_namespace);
  var _hasNamespace = (_arguments.length > 1);
  var _name = (_arguments.length > 1 ? _arguments[1] : _arguments[0] );
  var _nameDashed = MakeUtilities.camelToDash(_name);

  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'container.jsx.handlebars');
  }

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, 'client', 'containers');

    if (_hasNamespace) {
      componentRoot = path.join(componentRoot, _namespace);
    }

    componentRoot = path.join(componentRoot, _name);

    return componentRoot;
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });
    var template = Handlebars.compile(raw);
    return template({
      namespace: _namespace,
      namespaceDashed: _namespaceDashed,
      hasNamespace: _hasNamespace,
      name: _name,
      nameDashed: _nameDashed
    });
  }

  var handle = function () {
    var jsxContent = _templatize(_templatePath());

    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);

    write.sync(path.join(base, _name + 'Container.jsx'), jsxContent);

  };

  return {
    handle: handle
  }
};

module.exports = MakeContainerCommand;