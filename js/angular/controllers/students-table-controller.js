var app = angular.module('baseApp');

// This js file is used for showing the firebase database on students.html

app.controller('tableCtrl', ['$scope', 'firebaseService', 'authService', function($scope, firebaseService, authService) {
  authService.checkUser();

  $scope.students = {};

  firebaseService.getStudents(function(students) {
    $scope.students = students;
    $scope.$apply();
    console.log($scope.students);
  }, function(error) {
    console.log(error);
  });
  
	  // This function is used to return a boolean to see if student.schedule contains a certain day
  $scope.writeBusyDays = function(curr_class) {
	  var daysStr = "";
	  for (var k in curr_class.days) {
		  //console.log("k is " + k);
		  //console.log("curr_class is " + curr_class.days[k]);
		  if(curr_class.days[k]){
			  daysStr = daysStr.concat(k);
		  }
	  }
	  
	  if(daysStr.length > 1){ // Sort the string
		  daysStr = daysStr.split("");
		  
		  for (i = 0; i < daysStr.length; ++i) {
			  var letter = daysStr[i];
			  if(letter == "M"){
				  daysStr[i] = 1;
			  }
			  else if(letter == "T"){
				  daysStr[i] = 2;
			  }
			  else if(letter == "W"){
				  daysStr[i] = 3;
			  }
			  else if(letter == "R"){
				  daysStr[i] = 4;
			  }
			  else if(letter == "F"){
				  daysStr[i] = 5;
			  }
		  }
		  
		  daysStr.sort();
		  
		  for (i = 0; i < daysStr.length; ++i) {
			  var letter = daysStr[i];
			  
			  if(letter == 1){
				  daysStr[i] = "M";
			  }
			  else if(letter == 2){
				  daysStr[i] = "T";
			  }
			  else if(letter == 3){
				  daysStr[i] = "W";
			  }
			  else if(letter == 4){
				  daysStr[i] = "R";
			  }
			  else if(letter == 5){
				  daysStr[i] = "F";
			  }
		  }
		  daysStr = daysStr.join("");
	  }
	  
	  return daysStr;
  };
  
  
  $scope.makeTagArray = function(tags) {
	  return tags.split(",");
  }
  
  
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
