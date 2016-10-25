var app = angular.module('baseApp');

app.controller('studentsCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
  $scope.students = [];

  var error = function(err) {
    console.log("called error");
    console.log(err);
  }

  $scope.getStudents = function() {
    firebaseService.getStudents().then(function(students) {
      $scope.students = students;
      $scope.$apply();
    });
  };

  var something = firebaseService.updateStudent("-KUcJpOM8ztJ2R0YNU", {hello: "world"}, function(result) {
    console.log(result);
  }, error);
  $scope.getStudents();
}]);
