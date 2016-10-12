(function() {
    var app = angular.module('baseApp');

    app.controller('studentCtrl', ['$scope', function($scope) {

        // a simple class to record information about a course a student is taking
        function Course(courseID, startTime, endTime, days) {
            this.courseID = courseID;
            this.startTime = startTime;
            this.endTime = endTime;
            this.days = days;
        }

        // a simple class to record information about a grade earned by a candidate
        function PastGrade() {
          // need to fill this class out further
        }

        // an array to hold student course entries for a student
        // there is one course by default
        $scope.courses = [new Course("", "", "", [])];

        // an array to hold student grades
        // there is one grade by default
        $scope.pastGrades = [new PastGrade()];

        // a function to create a new course
        $scope.addCourse = function() {
            $scope.courses.push(new Course("", "", "", []));
        };

        // a function to add another student grade
        $scope.addPastGrade = function() {
            $scope.pastGrades.push(new PastGrade());
        };

        $scope.startTimes = ['8:00am', '8:10am', '8:20am', '8:30am', '8:40am', '8:50am',
            '9:00am', '9:10am', '9:20am', '9:30am', '9:40am', '9:50am',
            '10:00am', '10:10am', '10:20am', '10:30am', '10:40am', '10:50am',
            '11:00am', '11:10am', '11:20am', '11:30am', '11:40am', '11:50am',
            '12:00pm', '12:10pm', '12:20pm', '12:30pm', '12:40pm', '12:50pm',
            '1:00pm', '1:10pm', '1:20pm', '1:30pm', '1:40pm', '1:50pm',
            '2:00pm', '2:10pm', '2:20pm', '2:30pm', '2:40pm', '2:50pm',
            '3:00pm', '3:10pm', '3:20pm', '3:30pm', '3:40pm', '3:50pm',
            '4:00pm', '4:10pm', '4:20pm', '4:30pm', '4:40pm', '4:50pm',
            '5:00pm', '5:10pm', '5:20pm', '5:30pm', '5:40pm', '5:50pm',
            '6:00pm', '6:10pm', '6:20pm', '6:30pm', '6:40pm', '6:50pm',
            '7:00pm', '7:10pm', '7:20pm', '7:30pm', '7:40pm', '7:50pm',
            '8:00pm', '8:10pm', '8:20pm', '8:30pm', '8:40pm', '8:50pm',
            '9:00pm', '9:10pm', '9:20pm', '9:30pm', '9:40pm', '9:50pm', '10:00pm'
        ];
        $scope.selectedStartTime;
        $scope.getSelectedStartTime = function() {
            if ($scope.selectedStartTime !== undefined) {
                return $scope.selectedStartTime;
            } else {
                return "Start Time";
            }
        };
        $scope.endTimes = ['8:00am', '8:10am', '8:20am', '8:30am', '8:40am', '8:50am',
            '9:00am', '9:10am', '9:20am', '9:30am', '9:40am', '9:50am',
            '10:00am', '10:10am', '10:20am', '10:30am', '10:40am', '10:50am',
            '11:00am', '11:10am', '11:20am', '11:30am', '11:40am', '11:50am',
            '12:00pm', '12:10pm', '12:20pm', '12:30pm', '12:40pm', '12:50pm',
            '1:00pm', '1:10pm', '1:20pm', '1:30pm', '1:40pm', '1:50pm',
            '2:00pm', '2:10pm', '2:20pm', '2:30pm', '2:40pm', '2:50pm',
            '3:00pm', '3:10pm', '3:20pm', '3:30pm', '3:40pm', '3:50pm',
            '4:00pm', '4:10pm', '4:20pm', '4:30pm', '4:40pm', '4:50pm',
            '5:00pm', '5:10pm', '5:20pm', '5:30pm', '5:40pm', '5:50pm',
            '6:00pm', '6:10pm', '6:20pm', '6:30pm', '6:40pm', '6:50pm',
            '7:00pm', '7:10pm', '7:20pm', '7:30pm', '7:40pm', '7:50pm',
            '8:00pm', '8:10pm', '8:20pm', '8:30pm', '8:40pm', '8:50pm',
            '9:00pm', '9:10pm', '9:20pm', '9:30pm', '9:40pm', '9:50pm', '10:00pm'
        ];
        $scope.selectedEndTime;
        $scope.getSelectedEndTime = function() {
            if ($scope.selectedEndTime !== undefined) {
                return $scope.selectedEndTime;
            } else {
                return "End Time";
            }
        };
        $scope.grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
        $scope.selectedGrade;
        $scope.getSelectedGrade = function() {
            if ($scope.selectedGrade !== undefined) {
                return $scope.selectedGrade;
            } else {
                return "Grade";
            }
        };
    }]);
})();
