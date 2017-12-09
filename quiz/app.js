'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ["firebase"])

.controller("MyCtrl", function($scope, $firebaseObject) {
	var ref = firebase.database().ref()
	
	$scope.data = $firebaseObject(ref)

	$scope.data.$watch(function() {
		$scope.question = $scope.data.questions[$scope.data.current_question_id]
		
		if ($scope.question != undefined && $scope.question.votes != undefined) {
			$scope.vote_stats  = aggregate_votes($scope.question.votes)
		}
	})

	$scope.cookie_id = '123'


	var vote = function(vote) {
		if ($scope.question.votes === undefined) {
			$scope.question.votes = {}
		}
		$scope.question.votes[$scope.cookie_id] = vote;
		$scope.data.$save()
	}


	var aggregate_votes = function(votes) {
		var vote_stats = {
			yes: 0,
			no: 0,
			na: 0,
		}

		for (var k in votes) {
			if (votes[k] in vote_stats) {
				vote_stats[votes[k]] += 1

			}
		}
		vote_stats.score= (vote_stats.yes - vote_stats.no) / votes.length

		return vote_stats
	}

	$scope.no = function() { return vote('no') }
	$scope.na = function() { return vote('na') }
	$scope.yes = function() { return vote('yes') }

})

