var app = angular.module('baseApp');

app.controller('abstractStudentCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', function($scope, $location, $routeParams, firebaseService) {
  $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

  if($location.path().includes("edit-student")) {
    $scope.student = firebaseService.getStudentById($routeParams.student_id);
  } else {
    $scope.student = new Student();
  }

  $scope.addCourse = function() {
    $scope.student.addCourseTaking(new CourseTaking());
  };

  $scope.removeCourse = function(idx) {
    $scope.student.removeCourseTaking(idx);
  };

  $scope.addGrade = function() {
    $scope.student.addGrade(new Grade());
  };

  $scope.removeGrade = function(idx) {
    $scope.student.removeGrade(idx);
  };

  $scope.submit = function() {
    $scope.student.schedule.forEach(function(course) {
      delete course["$$hashKey"];
    });
    $scope.student.grades.forEach(function(grade) {
      delete grade["$$hashKey"];
    });
    firebaseService.addStudent($scope.student);
  };
}]);
