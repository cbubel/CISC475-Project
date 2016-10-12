(function () {
    var app = angular.module('baseApp');

    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/home.html"
        })
        .when("/students", {
            templateUrl : "views/students.html",
            controller: "studentsCtrl"
        })
        .when("/studentForm", {
            templateUrl : "views/studentForm.html",
            controller: "studentCtrl"
        })
        .when("/courseForm", {
            templateUrl : "views/courseForm.html",
            controller: "courseCtrl"
        })
        .otherwise({
            templateUrl: "views/404.html"
        });
    });
})();
