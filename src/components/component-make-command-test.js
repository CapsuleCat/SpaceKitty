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

  it( 'creates files for the given name and namespace', function () {
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

  it( 'creates files for the given name', function () {
    var command = new ComponentMakeCommand({
      name: 'Arena',
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.exactly(3);

    fileHandler.create.should.have.been.called.with(
      'client/components/arena/arena.jsx',
`import React from 'react';

/**
 * Arena
 */
export default () => (
  <div class="arena">
    Arena
  </div>
);
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/arena/_arena.scss',
`.arena {
  //
}
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/arena/tests/arena.jsx',
`const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';

import Arena from '../arena.jsx';

describe('Arena', () => {
  it('should exist', () => {
    const el = shallow(<Arena />);
    expect(el.find('.arena').length).to.be.equal(1);
  });
});
`
    );
  });

  it( 'creates files for the given CamelName', function () {
    var command = new ComponentMakeCommand({
      name: 'CamelName',
      fileHandler: fileHandler
    });

    command.handle();

    fileHandler.create.should.have.been.called.exactly(3);

    fileHandler.create.should.have.been.called.with(
      'client/components/camel-name/camel-name.jsx',
`import React from 'react';

/**
 * CamelName
 */
export default () => (
  <div class="camel-name">
    CamelName
  </div>
);
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/camel-name/_camel-name.scss',
`.camel-name {
  //
}
`
    );

    fileHandler.create.should.have.been.called.with(
      'client/components/camel-name/tests/camel-name.jsx',
`const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';

import CamelName from '../camel-name.jsx';

describe('CamelName', () => {
  it('should exist', () => {
    const el = shallow(<CamelName />);
    expect(el.find('.camel-name').length).to.be.equal(1);
  });
});
`
    );
  });
});
