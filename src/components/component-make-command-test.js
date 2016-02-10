var ComponentMakeCommand = require('./component-make-command');

var chai = require( 'chai' );
var spies = require('chai-spies');

chai.use(spies);

var should = chai.should();

describe( 'component:make', function () {
  var fileHandler;

  beforeEach(function () {
    fileHandler = chai.spy.object([
      'create'
    ]);
  });

  it( 'creates a jsx file', function () {
    var command = new ComponentMakeCommand({
      namespace: 'Game',
      name: 'Arena',
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.exactly(3);

    fileHandler.create.should.have.been.called.with(
      'client/components/game/arena/arena.jsx',
`import React from 'react';

/**
 * Game Arena
 */
export default () => (
  <div class="game-arena">
    Game Arena
  </div>
);
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/game/arena/_arena.scss',
`.game-arena {
  //
}
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/game/arena/tests/arena.jsx',
`const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Arena from '../arena.jsx';

describe('Game Arena', () => {
  it('should exist', () => {
    const el = shallow(<Arena />);
    expect(el.find('.game-arena').length).to.be.equal(1);
  });
});
`
    );
  });
});
