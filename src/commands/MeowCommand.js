var MeowCommand = function () {
  var handle = function () {
    console.log('meow');
  };

  return {
    handle: handle
  }
};

module.exports = MeowCommand;
