var Handlebars = require('handlebars');
var read = require('read-file');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities')

var ContainerMakeCommand = function (options) {
  var fileHandler = null;
  var name = '';
  var nameDashed = '';
  var stores = [];
  var storesMerged = '';

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

  if ( options.stores && options.stores.length > 0 ) {
    var storeIndex = 0;
    var storeTemp = [];

    for (storeIndex = 0; storeIndex < options.stores.length; storeIndex++) {
      stores.push( {
        name: options.stores[storeIndex],
        dashed: MakeUtilities.camelToDash( options.stores[storeIndex] ) 
      } );
      storeTemp.push( options.stores[storeIndex] );
    }

    storesMerged = storeTemp.join(', ');
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });

    var capitalName = MakeUtilities.toUpperCaseWords( name );

    var template = Handlebars.compile(raw);

    return template({
      name: name,
      nameDashed: nameDashed,
      capitalName: capitalName,
      stores: stores,
      storesMerged: storesMerged
    });
  }

  var handle = function () {
    var jsContent = _templatize(
        path.join(__dirname, 'templates', 'container.jsx.handlebars' )
    );

    // Make the base path
    var basePath = path.join( 'client', 'containers' );

    // Create the file paths
    var jsPath = path.join( basePath, nameDashed + '.js' );

    fileHandler.create( jsPath, jsContent );
  };

  return {
    handle: handle
  }
};

module.exports = ContainerMakeCommand;
