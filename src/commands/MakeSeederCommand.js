var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities');

var MakeSeederCommand = function () {
  var _arguments = Array.prototype.slice.call(arguments);
  var _namespace = (_arguments.length > 1 ? _arguments[0] : '');
  var _namespaceDashed = MakeUtilities.camelToDash(_namespace);
  var _hasNamespace = (_arguments.length > 1);
  var _name = (_arguments.length > 1 ? _arguments[1] : _arguments[0] );
  var _nameDashed = MakeUtilities.camelToDash(_name);

  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'seed.js.handlebars');
  }

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, 'server', 'migrations', 'seeds');

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
    var jsContent = _templatize(_templatePath());

    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);

    var name = _name;
    if (_hasNamespace) { 
      name = _namespace + _name;
    }
  
    write.sync(path.join(base, name + '.js'), jsContent);
  };

  return {
    handle: handle
  }
};

module.exports = MakeSeederCommand;
