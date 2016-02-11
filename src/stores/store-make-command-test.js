var StoreMakeCommand = require('./store-make-command');

var chai = require( 'chai' );
var spies = require( 'chai-spies' );

chai.use(spies);

var should = chai.should();

describe( 'store:make', function () {
  var fileHandler;

  beforeEach(function () {
    fileHandler = chai.spy.object([
      'create'
    ]);
  });

  it( 'creates files for the given name and actions', function () {
    var command = new StoreMakeCommand({
      name: 'GameStore',
      actions: ['GameActions', 'PlayerActions'],
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.once();

    fileHandler.create.should.have.been.called.with(
      'client/stores/game-store.js',
`import Reflux from 'reflux';

import { default as GameActions } from '../actions/game-actions';
import { default as PlayerActions } from '../actions/player-actions';

/**
 * GameStore
 */
const GameStore = Reflux.createStore({
  listenables: [GameActions, PlayerActions],
  init() {
    //
  },
  getInitialState() {
    return {
      //
    };
  }
});

export default { GameStore };
`
    );
  });

  it( 'can have no actions to listen to', function () {
    var command = new StoreMakeCommand({
      name: 'GameStore',
      actions: [],
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.once();

    fileHandler.create.should.have.been.called.with(
      'client/stores/game-store.js',
`import Reflux from 'reflux';

/**
 * GameStore
 */
const GameStore = Reflux.createStore({
  listenables: [],
  init() {
    //
  },
  getInitialState() {
    return {
      //
    };
  }
});

export default { GameStore };
`
    );
  });
});
