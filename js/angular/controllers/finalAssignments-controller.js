var app = angular.module('baseApp');

app.controller('finalCtrl', ['$scope', 'firebaseService', 'authService', function($scope, firebaseService, authService) {
    authService.checkUser();
    $scope.getDataHeader = function(){
      return ["Course","Section", "Name", "Email"];
    }

    firebaseService.getAllAssignments(function(object) {
        $scope.allAssignments = object;
        $scope.$apply();
        console.log($scope.allAssignments);
    }, function(error) {
        console.log("Couldn't get list of all assignments");
        console.log(error);
    });

    firebaseService.getCourses(function(courses) {
        $scope.courseAssignments = [];
        $scope.csvAssignments = [];
        courses.forEach(function(course, index) {
            // get the final assignments for this course
            firebaseService.getFinalAssignment(course.firebaseId, function(result) {
                // get key candidate info for this course
                console.log(result);
                var candidates = [];
                $scope.courseAssignments.push([course, candidates]);
                $scope.$apply()
                result.forEach(function(candidate) {
                    firebaseService.getStudentById(candidate.studentId, function(student) {
                        var candidateInfo = {};
                        candidateInfo.name = student.first_name + " " + student.last_name;
                        candidateInfo.section = candidate.section;
                        candidateInfo.studentID = student.id;
                        candidateInfo.firebaseID = candidate.studentId;
                        candidateInfo.email = student.email;
                        candidates.push(candidateInfo);
                        // if by student
                        // $scope.csvAssignments.push([course.courseID, candidateInfo.section, candidateInfo.name, student.email])
                        // once we have all the info about candidates we need, we push the candidates list
                        if (candidates.length == result.length) {
                            $scope.courseAssignments[index] = [course, candidates];
                            //if by course
                            for(var i=0; i < candidates.length; i++){
                              $scope.csvAssignments.push([course.courseID, candidates[i].section, candidates[i].name, candidates[i].email]);
                            }
                            $scope.$apply();
                        };

                    }, function(error) {
                        console.log(error);
                    });
                });
            }, function(error) {
                console.log(error);
            });
        });

    }, function(error) {
        console.log(error);
    });

}]);
