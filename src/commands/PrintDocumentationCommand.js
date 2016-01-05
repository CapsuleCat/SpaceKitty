var PrintDocumentationCommand = function () {
  var handle = function () {
    console.log('Space Kitty - Version 1.0.0');
    console.log('');
    console.log('├── create          ─ Create a new project');
    console.log('├── make');
    console.log('|    ├── command    ─ Create a dispatchable command');
    console.log('|    ├── collection ─ Create a collection (only supports Mongo)');
    console.log('|    ├── migration  ─ Create a migration (uses percolate:migrations)');
    console.log('|    └── view       ─ Create a view module');
    console.log('└── meow            ─ Verify that Space Kitty can meow');
  };

  return {
    handle: handle
  }
};

module.exports = PrintDocumentationCommand;
