var app = angular.module('baseApp');

app.controller('coursesCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
  $scope.courses = {};

  $scope.prettifyDays = function(days) {
    var res = "";
    for(var day in days) {
      res += day.toUpperCase();
    }
    return res;
  }

  firebaseService.getCourses(function(courses) {
    $scope.courses = courses;
    console.log(courses);
    $scope.$apply();
  }, function(error) {
    console.log(error);
  });

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    console.log(students);
    $scope.$apply();
  }, function(error) {
    console.log(error);
  });
}]);
