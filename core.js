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
	console.log(votes)

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
	console.log(vote_stats)
	return vote_stats
}

