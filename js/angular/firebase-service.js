var app = angular.module('baseApp');

app.service("firebaseService", function() {
  var db = firebase.database();

  /* STUDENT OPERATIONS */

  var castSingleToStudent = function(obj, key) {
    var s = new Student(
      obj.isUndergrad,
      obj.id,
      obj.first_name,
      obj.last_name,
      obj.email,
      obj.schedule,
      obj.grades,
      obj.tags
    );
    s.firebaseId = key;
    return s;
  };

  var castManyToStudent = function(objects) {
    var students = [];
    for(var key in objects) {
      var obj = objects[key];
      students.push(castSingleToStudent(obj, key));
    }
    return students;
  }

  this.getStudents = function(success, failure) {
    return db.ref("students").once("value")
    .then(function(snapshot) {
      success(castManyToStudent(snapshot.val()));
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


  /* COURSE OPERATIONS */

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
    console.log(course);
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

  /* ASSIGNMENT OPERATIONS */

  // adds the given student to the course's candidate choices
  // takes in the firebase id of the student and course
  this.addCandidateAssignment = function(studentID, courseID, success, failure) {
    db.ref(`assignments/${courseID}/candidates`).push(studentID)
    .then(function(snapshot) {
      success("Successfully added student");
    }, function(error) {
      failure(error);
    });
  };

  // adds the given student to the course's final choices
  // takes in the firebase id of the student and course
  this.addFinalAssignment = function(studentID, courseID, success, failure) {
    db.ref(`assignments/${courseID}/final`).push(studentID)
    .then(function(snapshot) {
      success("Successfully added student");
    }, function(error) {
      failure(error);
    });
  };

  // returns all the studenIDs of the candidate choices for the given firebase courseID
  this.getCandidates = function(courseID, success, failure) {
    return db.ref(`assignments/${courseID}/candidates`).once("value")
    .then(function(snapshot) {
      success(snapshot.val());
    }, function(error) {
      failure(error);
    });
  };

  // returns all the studentIDs of the final choices for the given firebase courseID
  this.getFinalChoice = function(courseID, success, failure) {
    return db.ref(`assignments/${courseID}/final`).once("value")
    .then(function(snapshot) {
      success(snapshot.val());
    }, function(error) {
      failure(error);
    });
  };

  // Use this to get a json of all assignments. Each course is mapped to a candidates
  // key and a final key. The values of these keys are firebase ids of students.
  // assignments -> courseID -> candidates/final -> studentID
  this.getAllAssignments = function(success, failure) {
    return db.ref(`assignments`).once("value")
    .then(function(snapshot) {
      success(snapshot.val());
    }, function(error) {
      failure(error);
    });
  };

  // Will remove student from course's candidates. Must take in the firebase ID
  // of the assignment (not the student's ID), and the firebase ID of the course
  this.removeCandidate = function(firebaseID, courseID, success, failure) {
    db.ref(`assignments/${courseID}/candidates/${firebaseID}`).remove()
    .then(function(snapshot) {
      success("Successfully added student");
    }, function(error) {
      failure(error);
    });
  };

  // Will remove student from course's final field. Must take in the firebase ID
  // of the assignment (not the student's ID), and the firebase ID of the course
  this.removeCandidate = function(firebaseID, courseID, success, failure) {
    db.ref(`assignments/${courseID}/final/${firebaseID}`).remove()
    .then(function(snapshot) {
      success("Successfully added student");
    }, function(error) {
      failure(error);
    });
  };

//  this.removeCandidate("-KX7iJZTgAZVVYKEFbOi", "-KW04wfI9hVWP_2m38ap", "success", "failure");
//  this.getFinalChoice("-KW04wfI9hVWP_2m38ap", "success", "failure");
//  this.getCandidates("-KW04wfI9hVWP_2m38ap", "success", "failure");
//  this.getAllAssignments("success", "failure");
//this.addCandidateAssignment("-KW05_j8ec1kR90BxdJi", "-KW04wfI9hVWP_2m38ap", "success", "failure");
//this.addFinalAssignment("-KW04mhLzhP__N6JRomT", "-KW04wfI9hVWP_2m38ap", "success", "failure");
});
