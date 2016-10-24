var app = angular.module('baseApp');

app.controller('courseCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.courses = [];

    $scope.getCourses = function() {
        firebaseService.getCourses().then(function(courses) {
            $scope.courses = courses;
            $scope.$apply();
        });
    };

    $scope.getCourses();
}]);
