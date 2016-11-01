var app = angular.module('baseApp');

app.controller('editCourseCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', function($scope, $location, $routeParams, firebaseService) {
  $scope.course = firebaseService.getCourseById($routeParams.course_id);

  $scope.addSection = function() {
    $scope.course.addSection(new CourseSection());
  };

  $scope.removeSection = function(idx) {
    $scope.course.removeSection(idx);
  };

  $scope.submit = function() {
      $scope.course.sections.forEach(function(section) {
          delete section["$$hashKey"];
      });
      firebaseService.addCourse($scope.course, function(result) {
        toastr.success("Added Course");
        console.log(result);
      }, function(error) {
        toastr.error("Failed to add");
        console.log(error);
      });
  };

}]);
