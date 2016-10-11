(function () {
    var app = angular.module('baseApp');
  
    app.service("firebaseService", function() {
        var db = firebase.database();
        
        this.readTestData = function() {
            db.ref("another").once("value").then(function(snapshot) {
                console.log(snapshot.val());
                return snapshot.val();
            });
        };

    });
})();