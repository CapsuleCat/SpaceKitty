var Handlebars = require('handlebars');
var read = require('read-file');
var write = require('write');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities');

var MakeCollectionCommand = function () {
  var _arguments = Array.prototype.slice.call(arguments);
  var _namespace = (_arguments.length > 1 ? _arguments[0] : '');
  var _namespaceDashed = MakeUtilities.camelToDash(_namespace);
  var _hasNamespace = (_arguments.length > 1);
  var _name = (_arguments.length > 1 ? _arguments[1] : _arguments[0] );
  var _nameDashed = MakeUtilities.camelToDash(_name);
  var _hasSchema = false;
  var _local = false;
  var _class = false;
  var _selfPublishes = false;

  var _templatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'mongo-collection.js.handlebars');
  }

  var _createPath = function(workingDirectory) {
    // TODO allow the user to create the new view from anywhere in the project (not just the root)
    var componentRoot;

    if (_local) {
      componentRoot = path.join(workingDirectory, 'client', 'collections');
    } else {
      componentRoot = path.join(workingDirectory, 'lib', 'collections');
    }

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
      nameDashed: _nameDashed,
      hasSchema: _hasSchema,
      selfPublishes: _selfPublishes,
      local: _local,
      'class': _class
    });
  }

  var handle = function (flags) {
    if (flags.indexOf('--with-schema') !== -1) {
      _hasSchema = true;
    }

    if (flags.indexOf('--self-publishes') !== -1) {
      _selfPublishes = true;
    }

    if (flags.indexOf('--local') !== -1) {
      _local = true;
    }

    if (flags.indexOf('--class') !== -1) {
      _class = true;
    }

    var jsContent = _templatize(_templatePath());

    var workingDirectory = process.cwd();
    var base = _createPath(workingDirectory);
    write.sync(path.join(base, _name + '.js'), jsContent);
  };

  return {
    handle: handle
  }
};

module.exports = MakeCollectionCommand;
