var app = angular.module('baseApp');

app.service("firebaseService", function() {
  var db = firebase.database();

  this.getStudents = function() {
    return db.ref("students").once("value")
    .then(function(snapshot) {
      return snapshot.val();
    });
  };

  this.getCourses = function(){
    return db.ref("courses").once("value")
    .then(function(snapshot) {
      return snapshot.val();
    });
  };

  this.getStudentById = function(id){
    return db.ref(`students/${id}`).once("value")
    .then(function(snapshot) {
      return snapshot.val();
    }, function(error) {
      if(error) {
        console.error(error);
      } else {
        console.log("Success");
      }
    });
  };

  this.getCourseById = function(id){
    return db.ref(`courses/${id}`).once("value").then(function(snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    }, function(error){
      console.error(error);
    });
  };

  // Model others after this
  this.addStudent = function(student, success, failure) {
    console.log(student);
    db.ref("students").push(student)
    .then(function(snapshot) {
      success("Success");
    }, function(error) {
      failure(error);
    });
  };

  this.addCourse = function(course, success, failure) {
    db.ref("courses").push(course)
    .then(function(snapshot) {
      success("Success");
    }, function(error) {
      failure(error);
    });
  };

  this.updateStudent = function(id, student, callback, error) {
    return db.ref(`students/${id}`).update(student)
    .then(function(res) {
      callback("Success");
    }, function(error) {
      failure(error);
    });
  }

  this.updateCourse = function(id, course, callback, error) {
    return db.ref(`course/${id}`).update(course)
    .then(function(res) {
      callback("Success");
    }, function(error) {
      failure(error);
    });
  }

});
