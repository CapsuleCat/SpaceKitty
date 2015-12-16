var MeowCommand = require('../commands/MeowCommand');
var CreateCommand = require('../commands/CreateCommand');
var MakeViewCommand = require('../commands/MakeViewCommand');
var MakeCommandCommand = require('../commands/MakeCommandCommand');
var MakeCollectionCommand = require('../commands/MakeCollectionCommand');
var PrintDocumentationCommand = require('../commands/PrintDocumentationCommand');

var CommandStrategy = function(commandPattern, args, flags) {
  var _commander = function(klass) {
    var command = new klass(...args);
    command.handle(flags);
  }

  var execute = function () {
    if (commandPattern === 'meow') {
      _commander(MeowCommand);
    } else if (commandPattern === 'create') {
      _commander(CreateCommand);
    } else if (commandPattern === 'make:view') {
      _commander(MakeViewCommand);
    } else if (commandPattern === 'make:command') {
      _commander(MakeCommandCommand);
    } else if (commandPattern === 'make:collection') {
      _commander(MakeCollectionCommand);
    } else {
      _commander(PrintDocumentationCommand);
    }
  };

  return {
    execute: execute
  }
};

module.exports = CommandStrategy;
