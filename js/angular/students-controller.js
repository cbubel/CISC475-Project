(function () {
    var app = angular.module('baseApp');

    app.controller('studentsCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
        $scope.students = [];

        $scope.getStudents = function() {
            firebaseService.getStudents().then(function(students) {
                $scope.students = students;
                $scope.$apply();
            });
        };

        $scope.getStudents();
    }]);
})();
