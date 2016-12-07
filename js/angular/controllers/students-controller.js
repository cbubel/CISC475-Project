var app = angular.module('baseApp');

app.controller('studentsCtrl', ['$scope', 'firebaseService', 'authService', function($scope, firebaseService, authService) {
  authService.checkUser();
  
  $scope.students = [];

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    $scope.$apply();
    console.log($scope.students);
  }, function(error) {
    console.log(error);
  });

}]);
