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


    this.getStudentById = function(id){
      return db.ref("students").orderByChild("id").equalTo(id).on("child_added", function(snapshot) {
        return snapshot.val();
      }, function(error) {
        console.error(error);
      });
    };

    // Does not work yet, is inserting as a sub-item
    this.updateStudent = function(student){
      db.ref("students").orderByChild("id").equalTo(student.id).on('value', function(snapshot) {
        console.log(snapshot.val());
        console.log(student);
        if(snapshot != null){
          db.ref("students/" + snapshot.key).update(student);
        }
        else{
          console.error("Couldn't find student");
        }
      }, function(error) {
        // The Promise was rejected.
        console.error(error);
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
