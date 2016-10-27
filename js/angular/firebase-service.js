var app = angular.module('baseApp');

app.service("firebaseService", function() {
  var db = firebase.database();

  this.getStudents = function() {
    return db.ref("students").once("value")
    .then(function(snapshot) {
      return snapshot.val();
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


  this.getStudentById = function(id){
    db.ref("students").orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
      return snapshot.val();
    }, function(error) {
      if(error) {
        console.error(error);
      } else {
        console.log("Success");
      }
    });
  };

  // Does not work yet, is inserting as a sub-item
  this.updateStudent = function(id, student, callback, error) {
    db.ref(`students/${id}`).update(set)
    .then(function(res) {
      callback("Success");
    })
    .catch(function(err) {
      error(err);
    });
  }


  this.getCourseById = function(id){
    return db.ref("courses").orderByChild("courseID").equalTo(id).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      console.log(snapshot.val());
      return snapshot.val();
    }, function(error){
      console.error(error);
    });
  };

  this.addCourse = function(course) {
    db.ref("courses").push(course);
  };

  this.getCourses = function(){
    return db.ref("courses").once("value").then(function(snapshot) {
      return snapshot.val();
    });
  };
});
