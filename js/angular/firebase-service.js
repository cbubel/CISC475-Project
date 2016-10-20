var app = angular.module('baseApp');

app.service("firebaseService", function() {
    var db = firebase.database();

    this.getStudents = function() {
        return db.ref("students").once("value").then(function(snapshot) {
            return snapshot.val();
        });
    };

    this.addStudent = function(student) {
        db.ref("students").push(student);
    };
    
    this.addCourse = function(course) {
        db.ref("courses").push(course);
    };

    // I don't have access to db right now, but I am leaving the field
    // labelled as "courses"
    this.getCourses = function(){
        return db.ref("courses").once("value").then(function(snapshot) {
            return snapshot.val();
        });
    };

});
