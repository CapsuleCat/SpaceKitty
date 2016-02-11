var Handlebars = require('handlebars');
var read = require('read-file');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities')

var StoreMakeCommand = function (options) {
  var fileHandler = null;
  var name = '';
  var nameDashed = '';
  var actions = [];
  var actionsMerged = '';

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

  if ( options.actions && options.actions.length > 0 ) {
    var actionIndex = 0;
    var actionTemp = [];

    for (actionIndex = 0; actionIndex < options.actions.length; actionIndex++) {
      actions.push( {
        name: options.actions[actionIndex],
        dashed: MakeUtilities.camelToDash( options.actions[actionIndex] ) 
      } );
      actionTemp.push( options.actions[actionIndex] );
    }

    actionsMerged = actionTemp.join(', ');
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });

    var capitalName = MakeUtilities.toUpperCaseWords( name );

    var template = Handlebars.compile(raw);

    return template({
      name: name,
      nameDashed: nameDashed,
      capitalName: capitalName,
      actions: actions,
      actionsMerged: actionsMerged
    });
  }

  var handle = function () {
    var jsContent = _templatize(
        path.join(__dirname, 'templates', 'store.js.handlebars' )
    );

    // Make the base path
    var basePath = path.join( 'client', 'stores' );

    // Create the file paths
    var jsPath = path.join( basePath, nameDashed + '.js' );

    fileHandler.create( jsPath, jsContent );
  };

  return {
    handle: handle
  }
};

module.exports = StoreMakeCommand;
