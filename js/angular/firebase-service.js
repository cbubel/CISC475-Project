var app = angular.module('baseApp');

app.service("firebaseService", function() {
  var db = firebase.database();

  // Student Operations
  var castSingleToStudent = function(obj) {
    return new Student(
      obj.isUndergrad,
      obj.id,
      obj.first_name,
      obj.last_name,
      obj.email,
      obj.schedule,
      obj.grades,
      obj.tags
    );
  };

  var castManyToStudent = function(objects) {
    var students = [];
    for(var key in objects) {
      var obj = objects[key];
      students.push(castSingleToStudent(obj));
    }
    return students;
  }

  this.getStudents = function(success, failure) {
    return db.ref("students").once("value")
    .then(function(snapshot) {
      success(snapshot.val());
    }, function(error) {
      failure(error);
    });
  };

  this.getStudentById = function(id, success, failure) {
    return db.ref(`students/${id}`).once("value")
    .then(function(snapshot) {
      var obj = snapshot.val();
      success(castSingleToStudent(obj));
    }, function(error) {
      failure(error);
    });
  };

  this.addStudent = function(student, success, failure) {
    console.log(student);
    db.ref("students").push(student)
    .then(function(snapshot) {
      success("Successfully added student");
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
  };

  // Course Operations
  var castSingleToCourse = function(obj) {
    return new Course(
      obj.courseID,
      obj.courseTags,
      obj.sections
    );
  };

  var castManyToCourse = function(objects) {
    var courses = [];
    for(var key in objects) {
      var obj = objects[key];
      courses.push(castSingleToCourse(obj));
    }
    return courses;
  };

  this.getCourses = function(success, failure) {
    return db.ref("courses").once("value")
    .then(function(snapshot) {
      success(snapshot.val());
    }, function(error) {
      failure(error);
    });
  };

  this.getCourseById = function(id, success, failure){
    return db.ref(`courses/${id}`).once("value")
    .then(function(snapshot) {
      var obj = snapshot.val();
      success(castSingleToCourse(obj));
    }, function(error){
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

  this.updateCourse = function(id, course, callback, error) {
    return db.ref(`courses/${id}`).update(course)
    .then(function(res) {
      callback("Success");
    }, function(error) {
      failure(error);
    });
  };

});
