(function () {
    var app = angular.module('baseApp');

    app.controller('homeCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
        $scope.testFunction = function() {
            var data = firebaseService.readTestData();
            console.log(data);
        };

        $scope.testFunction();
    }]);
})();