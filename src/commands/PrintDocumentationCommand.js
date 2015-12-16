var PrintDocumentationCommand = function () {
  var handle = function () {
    console.log('Space Cat - Version 1.0.0');
    console.log('');
    console.log('├── make');
    console.log('|    ├── command    ─ Create a dispatchable command');
    console.log('|    ├── collection ─ Create a collection (only supports Mongo)');
    console.log('|    └── view       ─ Create a view module');
    console.log('└── meow            ─ Verify that Space Cat can meow');
  };

  return {
    handle: handle
  }
};

module.exports = PrintDocumentationCommand;
