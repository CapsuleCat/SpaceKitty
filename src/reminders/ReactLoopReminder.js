var ReactLoopReminder = function () {
  var remindMe = function () {
    console.log("{sources.map(function (source, i) {");
    console.log("\treturn <View key={sourceKey} props={prop} />;");
    console.log("})}");
  }

  return {
    remindMe: remindMe
  }
};

module.exports = ReactLoopReminder;
