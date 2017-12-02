//it needs friends...
var friends = require('../data/friends.js');

module.exports = function(app){

	//API GET request
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	//API POST request data
	app.post('/api/friends', function(req, res){

		//variables for the closest match and variables for parsing the survey results as well as a total difference variable for the for loop below
		var closestMatch = {
		  name: "",
		  photo: "",
		  difference: 1000
		};
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;
		var totalDifference = 0;

		//loops through friendsList and its scores in friends.js and figures out the friend with the least difference in score using math
		for  (var i=0; i< friends.length; i++) {
		  totalDifference = 0;
		    for (var j=0; j < friends[i].scores[j]; j++){

			//updates totalDifference using the total of the user scores minus each friend's total scores and sets the closestMatch to the closest friend in friends.js
			totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
			if (totalDifference <= closestMatch.difference){
			  closestMatch.name = friends[i].name;
			  closestMatch.photo = friends[i].photo;
			  closestMatch.difference = totalDifference;
			  }
			}
		}

		friends.push(userData);

		//JSON for survey.html
		res.json(closestMatch);
	});
}