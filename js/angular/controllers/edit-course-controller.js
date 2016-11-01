var app = angular.module('baseApp');

app.controller('editCourseCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', function($scope, $location, $routeParams, firebaseService) {
  $scope.course = firebaseService.getCourseById($routeParams.course_id);

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
          section.undergradTAsNeeded === 0 || section.gradTAsNeeded === 0 || section.undergradLAsNeeded === 0) {
            return false;
      }
    }
    return true;
  }

  $scope.submit = function() {
      if (areReqFieldsFilled()) {
        $scope.course.sections.forEach(function(section) {
            delete section["$$hashKey"];
        });
        firebaseService.addCourse($scope.course, function(result) {
          toastr.success("Updated Course");
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
