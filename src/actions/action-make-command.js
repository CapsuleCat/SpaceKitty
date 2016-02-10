var Handlebars = require('handlebars');
var read = require('read-file');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities')

var ActionMakeCommand = function (options) {
  var fileHandler = null;
  var name = '';
  var nameDashed = '';

  // Constructor
  // ===========
  if ( options.name ) {
    name = options.name;
    nameDashed = MakeUtilities.camelToDash( name );
  } else {
    throw new Error( 'name is required' );
  }

  if ( options.fileHandler ) {
    fileHandler = options.fileHandler;
  } else {
    throw new Error( 'a file handler is required' );
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });

    var capitalName = MakeUtilities.toUpperCaseWords( name );

    var template = Handlebars.compile(raw);

    return template({
      name: name,
      nameDashed: nameDashed,
      capitalName: capitalName
    });
  }

  var handle = function () {
    var jsContent = _templatize(
        path.join(__dirname, 'templates', 'action.js.handlebars')
    );

    // Make the base path
    var basePath = path.join( 'client', 'actions' );

    // Create the file paths
    var jsPath = path.join( basePath, nameDashed + '.js' );

    fileHandler.create( jsPath, jsContent );
  };

  return {
    handle: handle
  }
};

module.exports = ActionMakeCommand;
