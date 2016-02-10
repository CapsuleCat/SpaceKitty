var ActionMakeCommand = require('./action-make-command');

var chai = require( 'chai' );
var spies = require('chai-spies');

chai.use(spies);

var should = chai.should();

describe( 'action:make', function () {
  var fileHandler;

  beforeEach(function () {
    fileHandler = chai.spy.object([
      'create'
    ]);
  });

  it( 'creates files for the given name', function () {
    var command = new ActionMakeCommand({
      name: 'GameActions',
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.once();

    fileHandler.create.should.have.been.called.with(
      'client/actions/game-actions.js',
`import Reflux from 'reflux';

/**
 * GameActions
 */
const GameActions = Reflux.createActions([
  //
]);

export default { GameActions };
`
    );
  });
});
