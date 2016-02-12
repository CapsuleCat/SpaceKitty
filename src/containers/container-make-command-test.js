var ContainerMakeCommand = require('./container-make-command');

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
    var command = new ContainerMakeCommand({
      name: 'GameContainer',
      stores: ['GameStore', 'LobbyStore'],
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.once();

    fileHandler.create.should.have.been.called.with(
      'client/containers/game-container.js',
`import React from 'react';
import Reflux from 'reflux';

import { default as GameStore } from '../stores/game-store';
import { default as LobbyStore } from '../stores/lobby-store';

/**
 * GameContainer
 */
export default React.createClass({
  mixins: [
    Reflux.connect(GameStore, 'GameStore'),
    Reflux.connect(LobbyStore, 'LobbyStore')
  ],

  render() {
    return (
      <div>
        GameContainer
      </div>
    );
  }
});
`
    );
  });
});
