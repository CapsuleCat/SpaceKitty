var Handlebars = require('handlebars');
var read = require('read-file');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities')

var ComponentMakeCommand = function (options) {
  var fileHandler = null;
  var namespace = '';
  var hasNamespace = false;
  var name = '';
  var namespaceDashed = '';
  var nameDashed = '';

  // Constructor
  // ===========
  if ( options.namespace ) {
    namespace = options.namespace;
    namespaceDashed = MakeUtilities.camelToDash( namespace );
    hasNamespace = true;
  }

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
    var capitalNamespace = MakeUtilities.toUpperCaseWords( namespace );

    var template = Handlebars.compile(raw);

    return template({
      namespace: namespace,
      namespaceDashed: namespaceDashed,
      hasNamespace: hasNamespace,
      name: name,
      nameDashed: nameDashed,
      capitalName: capitalName,
      capitalNamespace: capitalNamespace
    });
  }

  var handle = function () {
    var jsxContent = _templatize(
        path.join(__dirname, 'templates', 'component.jsx.handlebars')
    );
    var scssContent = _templatize( 
        path.join(__dirname, 'templates', 'bem.scss.handlebars')
    );
    var testContent = _templatize( 
        path.join(__dirname, 'templates', 'test.jsx.handlebars')
    );

    // Make the base path
    var basePath = path.join( 'client', 'components' );

    if ( hasNamespace ) {
      basePath = path.join( basePath, namespaceDashed );
    }

    basePath = path.join( basePath, nameDashed );

    // Create the file paths
    var jsxPath = path.join( basePath, nameDashed + '.jsx' );
    var scssPath = path.join( basePath, '_' + nameDashed + '.scss' );
    var testPath = path.join( basePath, 'tests', nameDashed + '.jsx' );

    fileHandler.create( jsxPath, jsxContent );
    fileHandler.create( scssPath, scssContent );
    fileHandler.create( testPath, testContent );
  };

  return {
    handle: handle
  }
};

module.exports = ComponentMakeCommand;
