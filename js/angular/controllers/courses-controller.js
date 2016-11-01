var app = angular.module('baseApp');

app.controller('coursesCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
  $scope.courses = {};

  firebaseService.getCourses(function(courses) {
    $scope.courses = courses;
    console.log(courses);
    $scope.$apply();
  }, function(error) {
    console.log(error);
  });
}]);
