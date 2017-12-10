var config = {
    apiKey: "AIzaSyD4a9JV4Jdw95Zfv6IGSbGu0stZKEh9KOU",
    authDomain: "mistakes-42c6d.firebaseapp.com",
    databaseURL: "https://mistakes-42c6d.firebaseio.com",
    projectId: "mistakes-42c6d",
    storageBucket: "mistakes-42c6d.appspot.com",
    messagingSenderId: "52859361916"
};

firebase.initializeApp(config);	

var set_current_question = function(id) {
	firebase.database().ref("current_question_id").set(id)
}

var aggregate_votes = function(votes) {

	var vote_stats = {
		yes: 0,
		no: 0,
		na: 0,
	}
	if (votes !== undefined) {

		for (var k in votes) {
			if (votes[k] in vote_stats) {
				vote_stats[votes[k]] += 1

			}
		}

		vote_stats.score = (vote_stats.yes - vote_stats.no) / votes.length
	}

	return vote_stats
}

var update_stats_view = function(qid, stats) {
	console.log(qid)
	console.log(stats)
	$('.stats-'+qid).find('.stats-yes > .stats-value').text(stats.yes)
	$('.stats-'+qid).find('.stats-na  > .stats-value').text(stats.na)
	$('.stats-'+qid).find('.stats-no  > .stats-value').text(stats.no)
}

var auto_update_stats_view = function() {
	firebase.database().ref("questions").on('value', function(snapshot) {
		var questions = snapshot.val();
		for (var k in questions) {
			if (questions[k].votes) {
				var stats = aggregate_votes(questions[k].votes)
				update_stats_view(k, stats)
			}
		}
	})
}

var write_question = function(qid, question) {
	firebase.database().ref("questions").child(qid).child('title').set(question)
}