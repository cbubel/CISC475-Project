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
    .when("/add-student", {
        templateUrl : "views/add-student.html",
        controller: "addStudentCtrl"
    })
    .when("/add-course", {
        templateUrl : "views/add-course.html",
        controller: "addCourseCtrl"
    })
    .otherwise({
        templateUrl: "views/404.html"
    });
});
