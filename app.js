'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ["firebase","ngCookies"])

.controller("MyCtrl", function($scope, $firebaseObject, $cookies) {

	var ref = firebase.database().ref()
	
	$scope.data = $firebaseObject(ref)
	$scope.is_active = false
	
	$scope.data.$watch(function() {
		$scope.question = $scope.data.questions[$scope.data.current_question_id]
		
		if ($scope.question == undefined) {
			$scope.is_active = false
		
		} else if ($scope.question.votes) {
			$scope.is_active = true
			$scope.vote_stats  = aggregate_votes($scope.question.votes)
			$scope.current_vote = $scope.question.votes[$scope.cookie_id]	
		} else {
			$scope.is_active = true
			$scope.vote_stats  = aggregate_votes({})
			$scope.current_vote  = null
		}
		
		
	})

	var vote = function(vote) {
		if ($scope.question.votes === undefined) {
			$scope.question.votes = {}
		}
		$scope.question.votes[$scope.cookie_id] = vote;
		$scope.current_vote = vote;
		$scope.vote_stats[vote] += 1;
		$scope.data.$save()
	}
	$scope.no = function() { return vote('no') }
	$scope.na = function() { return vote('na') }
	$scope.yes = function() { return vote('yes') }

	//cookie
	var get_cookie_id = function() {
		function guid() {
		  function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		  }
		  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
		}
		
		if ($cookies.get("tencid") === undefined) {
			$cookies.put("tencid", guid(), {secure: false, expires: new Date(2020,1,1)})
		}

		return $cookies.get("tencid")
	}

	$scope.cookie_id = get_cookie_id()

})
