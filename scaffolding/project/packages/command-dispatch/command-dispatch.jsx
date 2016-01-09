dispatch = function (commandClass) {
  var args = Array.prototype.slice.call(arguments);
  args = args.slice(1);
  var command = new commandClass(...args);

  return command.handle();
};

dispatchAsync = function (commandClass) {
  var args = Array.prototype.slice.call(arguments);
  args = args.slice(1);
  callback = null;

  if (typeof args[args.length - 1] === 'function')
    callback = args.slice(args.length - 1, 1)[0];

  setTimeout( function () {
    var command = (new commandClass(...args));
    var result = command.handle();

    if (callback)
      callback(result);
  }, 0);
};
