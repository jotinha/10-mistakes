'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ["firebase"])

.controller("MyCtrl", function($scope, $firebaseObject) {
	var data = $firebaseObject(firebase.database().ref())

	$scope.data = data;
})

