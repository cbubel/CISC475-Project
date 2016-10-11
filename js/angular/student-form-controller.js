(function () {
  var app = angular.module('baseApp');

  app.controller('studentCtrl', ['$scope', function($scope) {

    var self = this;
    self.readonly = false;
    // Lists of fruit names and Vegetable objects
    self.fruitNames = ['Apple', 'Banana', 'Orange'];
    self.roFruitNames = angular.copy(self.fruitNames);
    self.tags = [];
    self.vegObjs = [
       {
          'name' : 'Broccoli',
          'type' : 'Brassica'
       },
       {
          'name' : 'Cabbage',
          'type' : 'Brassica'
       },
       {
          'name' : 'Carrot',
          'type' : 'Umbelliferous'
       }
    ];
    self.newVeg = function(chip) {
       return {
          name: chip,
          type: 'unknown'
       };
    };
    $scope.startTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      $scope.selectedStartTime;
      $scope.getSelectedStartTime = function() {
        if ($scope.selectedStartTime !== undefined) {
          return $scope.selectedStartTime;
        } else {
          return "Start Time";
        }
      };
    $scope.endTimes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
