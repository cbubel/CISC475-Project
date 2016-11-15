var app = angular.module('baseApp');

app.controller('studentsCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
  $scope.students = {};

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    $scope.$apply();
    console.log($scope.students);
  }, function(error) {
    console.log(error);
  });
  
  
  // The following code is used for expanding the tables in students.html
  
  $scope.oneAtATime = true;
  $scope.tableRowExpanded = false;
  $scope.tableRowIndexExpandedCurr = "";
  $scope.storeIdExpanded = "";

  $scope.dataCollapseFn = function(){
	  $scope.DataCollapse = [];
	  for (var i = 0; i < $scope.students.length; i+=1){
		  $scope.DataCollapse.push(false);
	  }
  };
  
  $scope.selectTableRow = function(index, storeId) {
	  if(typeof $scope.DataCollapse === 'undefined'){
		  $scope.dataCollapseFn();
	  }
	  
	  if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" && $scope.storeIdExpanded === "") {
            $scope.tableRowIndexExpandedPrev = "";
            $scope.tableRowExpanded = true;
            $scope.tableRowIndexExpandedCurr = index;
            $scope.storeIdExpanded = storeId;
            $scope.DataCollapse[index] = true;
        } else if ($scope.tableRowExpanded === true) {
            if ($scope.tableRowIndexExpandedCurr === index && $scope.storeIdExpanded === storeId) {
                $scope.tableRowExpanded = false;
                $scope.tableRowIndexExpandedCurr = "";
                $scope.storeIdExpanded = "";
                $scope.DataCollapse[index] = false;
            } else {
                $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
                $scope.tableRowIndexExpandedCurr = index;
                $scope.storeIdExpanded = storeId;
                $scope.DataCollapse[$scope.tableRowIndexExpandedPrev] = false;
                $scope.DataCollapse[$scope.tableRowIndexExpandedCurr] = true;
            }
        }

    };

}]);
