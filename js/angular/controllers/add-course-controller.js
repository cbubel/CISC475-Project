var app = angular.module('baseApp');

app.controller('addCourseCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {

  $scope.course = new Course();

  $scope.addSection = function() {
    $scope.course.addSection(new CourseSection());
  };

  $scope.submit = function() {
      $scope.course.sections.forEach(function(section) {
          delete section["$$hashKey"];
      });
      firebaseService.addCourse($scope.course);
  };

}]);
