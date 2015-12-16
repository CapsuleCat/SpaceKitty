#! /usr/bin/env node

var CommandStrategy = require('./strategies/CommandStrategy');

var userArgs = process.argv.slice(2);

// differentiate args from flags

var args = [];
var flags = [];

for (var i = 1; i < userArgs.length; i++) {
  if (userArgs[i].indexOf('--') === 0) {
    flags.push(userArgs[i]);
  } else {
    args.push(userArgs[i]);
  }
}

var commandStrategy = new CommandStrategy(userArgs[0], args, flags);

commandStrategy.execute();
