var app = angular.module('baseApp');

app.controller('addStudentCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

    $scope.student = new Student();

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

    var cleanUp = function() {
        $scope.student.schedule.forEach(function(course) {
            delete course["$$hashKey"];
        });
        $scope.student.grades.forEach(function(grade) {
            delete grade["$$hashKey"];
        });
    };

    function areReqFieldsFilled() {
        return !($scope.student.id == "" || $scope.student.schedule.length == 0 || isMissingScheduleInformation());
    };

    function isMissingScheduleInformation() {
        for (var i = 0; i < $scope.student.schedule.length; i++) {
            var course = $scope.student.schedule[i];
            if (course.id == "" || course.start_time == "" || course.end_time == "") {
                return true;
            }
        }
        return false;
    };

    $scope.submit = function() {

        if (areReqFieldsFilled()) {
            cleanUp();

            firebaseService.addStudent($scope.student, function(result) {
                toastr.success("Added student");
                $scope.student = new Student();
                $scope.$apply();
            }, function(error) {
                toastr.error("Failed to add");
            });
        } else {
            toastr.error("Required Fields Not Full");
        }
    };
}]);
