(function () {
    var app = angular.module('baseApp');

    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller: "homeCtrl"
        })
        .when("/test", {
            templateUrl : "views/test.html",
            controller: "studentCtrl"
        })
        .otherwise({
            templateUrl: "views/404.html"
        });
    });
})();
