var PrintDocumentationCommand = function () {
  var handle = function () {
    console.log('Space Kitty - Version 1.0.0');
    console.log('');
    console.log('├── create             ─ Create a new project');
    console.log('├── make');
    console.log('|    ├── command       ─ Create a dispatchable command');
    console.log('|    ├── collection    ─ Create a collection (only supports Mongo)');
    console.log('|    ├── meteor-method ─ Create a Meteor method');
    console.log('|    ├── migration     ─ Create a migration (uses percolate:migrations)');
    console.log('|    └── view          ─ Create a view module');
    console.log('├── remind-me');
    console.log('|    ├── meteor-call   ─ Reminds you how to call a meteor method');
    console.log('|    └── react-loop    ─ Reminds you how to achieve dynamic children in React');
    console.log('└── meow               ─ Verify that Space Kitty can meow');
  };

  return {
    handle: handle
  }
};

module.exports = PrintDocumentationCommand;
