var app = angular.module('baseApp');

app.controller('editStudentCtrl', ['$scope', '$location', '$routeParams', 'firebaseService', 'authService', function($scope, $location, $routeParams, firebaseService, authService) {
  authService.checkUser();

  $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

  $scope.standardTimeOptions = [
    {id: 1, option: 'AM'},
    {id: 2, option: 'PM'}
  ];

  $scope.changeTime = function(current, change) {
    if (typeof current != 'undefined') {
      return change + " " + current.split(' ')[1];
    }
    else {
      return change + " " + "AM";
    };
  };

  $scope.changeAMorPM = function(current, change) {
    if (typeof current != 'undefined') {
      return current.split(' ')[0] + " " + change;
    }
    else {
      return " " + change;
    };
  };

  $scope.removeStudent = function() {
    firebaseService.removeStudent($routeParams.student_id, function(result) {
      toastr.success("Removed student");
      $location.path("/students");
      console.log(result);
    firebaseService.getAllAssignments(function(allAssignments){
      for(var key in allAssignments){
        firebaseService.getCandidates(key, function(candidates){
          console.log("Candidates")
          console.log(candidates)
          for(var j = 0; j<candidates.length; j++){
            console.log("IDS")
            console.log(candidates[j].studentId)
            console.log($routeParams.student_id)
            console.log(key)
            if(candidates[j].studentId == $routeParams.student_id){
              firebaseService.removeCandidate(candidates[j].firebaseId, key, function(result2){
                toastr.success("Removed Candidate Assignment");
              }, function(error) {
                toastr.error("Failed to remove Candidate Assignment");
                console.log(error);
              });
              }
            }
          })
          firebaseService.getFinalAssignment(key, function(finals){
            for(var k = 0; k<finals.length; k++){
              if(finals[k].studentId == $routeParams.student_id){
                firebaseService.removeFinal(finals[k].firebaseId, key, function(result2){
                  toastr.success("Removed Final Assignment");
                }, function(error) {
                  toastr.error("Failed to remove Final Assignment");
                  console.log(error);
                });
                }
              }
            })
        }
      })
    })
  };

  $scope.initTime = function(time) {
    if (typeof time != 'undefined' && time != "") {
      return time.split(' ')[0];
    };
  };

  $scope.initAMorPM = function(time) {
    if (typeof time != 'undefined' && time != "") {
      var option = time.split(' ')[1];
      if (option == $scope.standardTimeOptions[0].option) {
        return $scope.standardTimeOptions[0];
      }
      else {
        return $scope.standardTimeOptions[1];
      }
    };
    return $scope.standardTimeOptions[0];
  };

  $scope.getCompleteTime = function(time, amOrPM) {
    console.log(time);
    console.log(amOrPM);
    return time + " " + amOrPM;
  };

  firebaseService.getStudentById($routeParams.student_id, function(student) {
    $scope.student = student;
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

  function areReqFieldsFilled() {
      return !($scope.student.id == "" || $scope.student.schedule.length == 0 || isMissingScheduleInformation());
  };

  function isMissingScheduleInformation() {
      for (var i = 0; i < $scope.student.schedule.length; i++) {
          var course = $scope.student.schedule[i];
          if (course.id == "" || course.start_time.length < 7 || course.end_time.length < 7) {
              return true;
          }
      }
      return false;
  };

  $scope.submit = function() {
    console.log($scope.student.schedule[0]);

    if (areReqFieldsFilled()) {
      // $scope.student.id = parseInt($scope.student.id);
      $scope.student.schedule.forEach(function(course) {
        delete course["$$hashKey"];
      });
      $scope.student.grades.forEach(function(grade) {
        delete grade["$$hashKey"];
      });
      firebaseService.updateStudent($routeParams.student_id, $scope.student, function(result) {
        toastr.success("Updated student");
        $location.path("/students");
      }, function(error) {
        toastr.error("Failed to update");
        console.log(error);
      });
    }
    else {
        toastr.error("Required Fields Not Full");
    }
  };
}]);
