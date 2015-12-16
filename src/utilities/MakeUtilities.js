var MakeUtilities = new (function () {
  this.camelToDash = function(str) {
    return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  }
})();

module.exports = MakeUtilities;
