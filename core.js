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