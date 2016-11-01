var app = angular.module('baseApp');

app.controller('addCourseCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {

  $scope.course = new Course();

  $scope.addSection = function() {
    $scope.course.addSection(new CourseSection());
  };

  $scope.removeSection = function(idx) {
    console.log(idx)
    $scope.course.removeSection(idx);
  };

  function areReqFieldsFilled() {
    return areReqCourseFieldsFilled() && areReqSectionFieldsFilled();
  }

  function areReqCourseFieldsFilled() {
    if ($scope.course.CourseID === "") {
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
          toastr.success("Added Course");
          console.log(result);
        }, function(error) {
          toastr.error("Failed to add");
          console.log(error);
        });
      }
      else {
        toastr.error("Required Fields Not Filled");
      }

  };

}]);
