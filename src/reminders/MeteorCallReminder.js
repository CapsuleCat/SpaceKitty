var MeteorCallReminder = function () {
  var remindMe = function () {
    console.log("Meteor.call('methodname', ...args, function (err, response) {");
    console.log("//");
    console.log("});");
  }

  return {
    remindMe: remindMe
  }
};

module.exports = MeteorCallReminder;


