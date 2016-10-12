(function () {
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

    });
})();