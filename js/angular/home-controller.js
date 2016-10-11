(function () {
  var app = angular.module('baseApp');

  app.controller('homeCtrl', ['$scope', function($scope) {
      var database = firebase.database();

      function read() {
          return database.ref("another").once("value").then(function(snapshot) {
              console.log(snapshot.val());
          });
      }

      read();
  }]);
})();