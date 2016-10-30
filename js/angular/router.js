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
  .when("/edit-student/:student_id", {
    templateUrl : "views/edit-student.html",
    controller: "editStudentCtrl"
  })
  .when("/add-course", {
    templateUrl : "views/add-course.html",
    controller: "addCourseCtrl"
  })
  .when("/edit-course/:course_id", {
    templateUrl : "views/edit-course.html",
    controller: "editCourseCtrl"
  })
  .otherwise({
    templateUrl: "views/404.html"
  });
});
