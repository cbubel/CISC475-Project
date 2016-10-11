(function () {
  var app = angular.module('baseApp');

  app.controller('homeCtrl', ['$scope', function($scope) {
      $scope.aVar = "Hello";
  }]);
})();