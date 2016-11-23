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
  };

  $scope.launchModal = function(course, section) {
    $scope.currentCourse = course;
    $scope.currentSection = section;
    $scope.currentStudents = $scope.students.slice();
    firebaseService.getCandidates(course.firebaseId, function(assignments) {
      $scope.currentAssignments = assignments;
      for(var i = 0; i < $scope.currentStudents.length; i++) {
        var assigned = false;
        for(var j = 0; j < $scope.currentAssignments.length; j++) {
          if($scope.currentAssignments[j].section == section.sectionID && $scope.currentStudents[i].firebaseId == $scope.currentAssignments[j].studentId) {
            $scope.currentStudents[i].isAssigned = true;
            $scope.currentStudents[i].assignmentFbId = $scope.currentAssignments[j].firebaseId;
            assigned = true;
            break;
          }
        }
        if(!assigned) $scope.currentStudents[i].isAssigned = false;
      }
      $scope.$apply();
    }, function(error) {
      toastr.error("Something went wrong getting candidates");
    });
  };

  $scope.removeStudent = function(fbId) {
    for(var i = 0; i < $scope.currentStudents.length; i++) {
      if($scope.currentStudents[i].firebaseId == fbId) {
        $scope.currentStudents.splice(i, 1);
      }
    }
  };

  $scope.assignCandidate = function(idx, studentFbId, courseFbId, section) {
    console.log(idx);
    firebaseService.addCandidateAssignment(studentFbId, courseFbId, section, function(uuFbId) {
      $scope.currentStudents[idx].isAssigned = true;
      console.log(uuFbId)
      $scope.currentStudents[idx].assignmentFbId = uuFbId;
      $scope.$apply();
      toastr.success("Added candidate");
    }, function(error) {
      toastr.error("Uh oh, something went wrong!");
    });
  };

  $scope.removeCandidate = function(idx, assignmentFbId, courseFbId) {
    console.log(idx, assignmentFbId, courseFbId);
    firebaseService.removeCandidate(assignmentFbId, courseFbId, function(success) {
      $scope.currentStudents[idx].isAssigned = false;
      toastr.success("Removed candidate");
      $scope.$apply();
    }, function(error) {
      toastr.error("Uh oh, something went wrong!");
    });
  };

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
