var app = angular.module('baseApp');

app.controller('coursesCtrl', ['$scope', 'firebaseService', 'courseTakenFilter', function($scope, firebaseService, courseTakenFilter) {
  $scope.courses = {};
  $scope.students = [];

  $scope.prettifyDays = function(days) {
    var res = "";
    for(var day in days) {
      res += day.toUpperCase();
    }
    return res;
  }

  $scope.launchModal = function(course, section) {
    $scope.currentCourse = course;
    $scope.currentSection = section;
    $scope.currentStudents = $scope.students.slice();
  }

  $scope.removeStudent = function(fbId) {
    for(var i = 0; i < $scope.currentStudents.length; i++) {
      if($scope.currentStudents[i].firebaseId == fbId) {
        $scope.currentStudents.splice(i, 1);
      }
    }
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
