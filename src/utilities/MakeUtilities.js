var MakeUtilities = new (function () {
  this.camelToDash = function(str) {
    return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  };

  this.toUpperCaseWords = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)});
  };

})();

module.exports = MakeUtilities;
