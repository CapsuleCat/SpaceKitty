var chai = require( 'chai' );
var spies = require('chai-spies');

chai.use(spies);

var should = chai.should();

/**
 *
 */
// describe( 'command registry', function () {
//   var Terminal;

//   beforeEach(function () {
//     // Mock the terminal
//     Terminal = {
//       type: function (text) {
//         // TODO

//         return '';
//       }
//     };
//   });

//   it( 'has component:make', function () {
//     var result = Terminal.type('kitty component:make');

//     result.should.contain( 'component:make' );
//   });
// });
