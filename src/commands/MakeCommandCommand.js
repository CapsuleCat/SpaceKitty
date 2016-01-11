var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities');

var MakeCommandCommand = function () {
  var _arguments = Array.prototype.slice.call(arguments);
  var _namespace = (_arguments.length > 1 ? _arguments[0] : '');
  var _namespaceDashed = MakeUtilities.camelToDash(_namespace);
  var _hasNamespace = (_arguments.length > 1);
  var _name = (_arguments.length > 1 ? _arguments[1] : _arguments[0] );
  var _nameDashed = MakeUtilities.camelToDash(_name);
  var _type = 'both'

  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'command.js.handlebars');
  }

  var _createPath = function(workingDirectory) {
    var dest = _type;
    if (_type === 'both' ) {
      dest = 'lib';
    }

    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot = path.join(workingDirectory, dest, 'commands');

    if (_hasNamespace) {
      componentRoot = path.join(componentRoot, _namespace);
    }

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

  var handle = function (flags) {
    _type = (function () {
      if (flags.indexOf('--client') !== -1) {
        return 'client';
      } else if (flags.indexOf('--server') !== -1) {
        return 'server';
      } else {
        return 'both';
      }
    })();

    var jsContent = _templatize(_templatePath());

    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);
    write.sync(path.join(base, _name + '.js'), jsContent);
  };

  return {
    handle: handle
  }
};

module.exports = MakeCommandCommand;
