var app = angular.module('baseApp');

app.controller('candidatesCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {

    firebaseService.getCourses(function(courses) {

        $scope.courseAssignments = [];

        courses.forEach(function(course) {

            // get the candidates for this course
            firebaseService.getCandidates(course.firebaseId, function(result) {

                // get key candidate info for this course
                var candidates = [];
                (function() {
                  result.forEach(function(candidate) {
                      firebaseService.getStudentById(candidate.studentId, function(student) {
                          var candidateInfo = {};
                          candidateInfo.name = student.first_name + " " + student.last_name;
                          candidateInfo.section = candidate.section;
                          candidateInfo.studentID = student.id;
                          candidates.push(candidateInfo);

                          // once we have all the info about candidates we need, we push the candidates list
                          if (candidates.length == result.length) {
                              $scope.courseAssignments.push([course, candidates]);
                              $scope.$apply();
                          };

                      }, function(error) {
                          console.log(error);
                      });
                  });

                  if (result.length == 0 || typeof result == 'undefined') {
                      $scope.courseAssignments.push([course, candidates]);
                      $scope.$apply();
                  };

                })();
            }, function(error) {
                console.log(error);
            });

        });

    }, function(error) {
        console.log(error);
    });

}]);
