var app = angular.module('baseApp');

app.controller('editStudentCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', function($scope, $location, $routeParams, firebaseService) {
  $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

  firebaseService.getStudentById($routeParams.student_id, function(student) {
    $scope.student = student;
    console.log(student);
    $scope.$apply();
  }, function(error) {
    console.log(error);
  });

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
    $scope.student.id = parseInt($scope.student.id);
    $scope.student.schedule.forEach(function(course) {
      delete course["$$hashKey"];
    });
    $scope.student.grades.forEach(function(grade) {
      delete grade["$$hashKey"];
    });

    firebaseService.updateStudent($routeParams.student_id, $scope.student, function(result) {
      toastr.success("Updated student");
      $location.path("/students");
      console.log(result);
    }, function(error) {
      toastr.error("Failed to update");
      console.log(error);
    });
  };
}]);
