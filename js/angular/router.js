(function () {
    var app = angular.module('baseApp');

    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/home.html"
        })
        .when("/test", {
            templateUrl : "views/test.html"
        })
        .otherwise({
            templateUrl: "views/404.html"
        })
    });
})();