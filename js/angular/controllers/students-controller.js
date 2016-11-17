var app = angular.module('baseApp');

app.controller('studentsCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
  $scope.students = {};

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    $scope.$apply();
    console.log($scope.students);
  }, function(error) {
    console.log(error);
  });

}]);
