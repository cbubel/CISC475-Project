var app = angular.module('baseApp');

app.controller('addStudentCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

    $scope.student = new Student();

    $scope.addCourse = function() {
        $scope.student.addCourseTaking(new CourseTaking());
    };

    $scope.addGrade = function() {
        $scope.student.addGrade(new Grade());
    };

    $scope.submit = function() {
        $scope.student.schedule.forEach(function(course) {
            delete course["$$hashKey"];
        });
        $scope.student.grades.forEach(function(grade) {
            delete grade["$$hashKey"];
        });
        firebaseService.addStudent($scope.student);
    };
}]);
