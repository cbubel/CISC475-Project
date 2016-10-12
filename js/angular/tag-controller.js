(function () {
  var app = angular.module('baseApp');

  app.controller('tagCtrl', ['$scope', function($scope) {
    var self = this;
    self.readonly = false;
    self.tagNames = [];
    self.tags = [];
  }]);
})();
