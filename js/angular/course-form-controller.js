(function() {
    var app = angular.module('baseApp');

    app.controller('courseCtrl', ['$scope', function($scope) {

        // a simple class for course sections - need to build out the section attributes more
        function Section() {
          // need to fill out this class further
        };

        // an array for holding sections
        $scope.sections = [new Section()];

        // a function to add a new sections
        $scope.addSection = function() {
            $scope.sections.push(new Section());
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
    }]);
})();
