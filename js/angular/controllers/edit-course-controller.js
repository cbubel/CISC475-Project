var app = angular.module('baseApp');

app.controller('editCourseCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', function($scope, $location, $routeParams, firebaseService) {
  $scope.course = firebaseService.getCourseById($routeParams.course_id, function(course) {
    $scope.course = course;
    $scope.$apply();
  }, function(error){
    console.log(error);
  });

  $scope.addSection = function() {
    $scope.course.addSection(new CourseSection());
  };

  $scope.removeSection = function(idx) {
    $scope.course.removeSection(idx);
  };

  function areReqFieldsFilled() {
    return areReqCourseFieldsFilled() && areReqSectionFieldsFilled();
  }

  function areReqCourseFieldsFilled() {
    if ($scope.course.courseID === "") {
      return false;
    }
    else {
      return true;
    }
  }

  function areReqSectionFieldsFilled() {
    for (var i = 0; i < $scope.course.sections.length; i++) {
      var section = $scope.course.sections[i];
      if (section.sectionID === "" || section.instructor === "" || section.startTime === "" || section.endTime === "" ||
          section.undergradTAsNeeded < 0 || section.gradTAsNeeded < 0 || section.undergradLAsNeeded < 0) {
            return false;
      }
    }
    return true;
  }

  $scope.submit = function() {
    if (areReqFieldsFilled()) {
      firebaseService.updateCourse($routeParams.course_id, $scope.course, function(result) {
        toastr.success("Updated course");
        $location.path("/courses");
        console.log(result);
      }, function(error) {
        toastr.error("Failed to update");
        console.log(error);
      });
    }
    else {
      toastr.error("Required Fields Not Filled");
    }
  };
}]);
