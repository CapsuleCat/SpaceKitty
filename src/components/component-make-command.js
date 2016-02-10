var Handlebars = require('handlebars');
var read = require('read-file');
var path = require('path');
var MakeUtilities = require('../utilities/MakeUtilities')

var ComponentMakeCommand = function (options) {
  var fileHandler = null;
  var namespace = '';
  var hasNamespace = false;
  var name = '';

  // Constructor
  // ===========
  if ( options.namespace ) {
    namespace = options.namespace;
    hasNamespace = true;
  }

  if ( options.name ) {
    name = options.name;
  } else {
    throw new Error( 'name is required' );
  }

  if ( options.fileHandler ) {
    fileHandler = options.fileHandler;
  } else {
    throw new Error( 'a file handler is required' );
  }

  /**
   * Get the path to the JSX template
   */
  var _getJsxTemplatePath = function() {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'component.jsx.handlebars');
  }

  var _getScssTemplatePath = function () {
    return path.join(__dirname, '..', '..', 'scaffolding', 'templates', 'bem.scss.handlebars');
  }

  var _templatize = function (templatePath) {
    var raw = read.sync(templatePath, { encoding: 'utf8' });

    var namespaceDashed = MakeUtilities.camelToDash( namespace );
    var nameDashed = MakeUtilities.camelToDash( name );
    var capitalName = MakeUtilities.toWordCamelCase( name );
    var capitalNamespace = MakeUtilities.toWordCamelCase( namespace );

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
    var jsxContent = _templatize( _getJsxTemplatePath() );
    var scssContent = _templatize( _getScssTemplatePath() );

    // Make the base path
    var basePath = path.join( 'client', 'components' );

    if ( hasNamespace ) {
      basePath = path.join( basePath, namespace );
    }

    basePath = path.join( basePath, name );

    // Create the file paths
    var jsxPath = path.join( basePath, name + '.jsx' );
    var scssPath = path.join( basePath, '_' + name + '.scss' );

    fileHandler.create( jsxPath, jsxContent );
    fileHandler.create( scssPath, scssContent );
  };

  return {
    handle: handle
  }
};

module.exports = ComponentMakeCommand;
