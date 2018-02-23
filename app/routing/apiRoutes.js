var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        // Displays a JSON of all possible friends.
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // Handles incoming survey results and the compatibility logic
        var newScores = req.body;
        var scoresArr = [];
        friends.forEach(friendScore => {
            var total = 0;
            for (var i = 0; i < 10; i++) {
                total += Math.abs(newScores.scores[i] - friendScore.scores[i]);
            }

            scoresArr.push(total);
        });

        var findLowest = Math.min.apply(null, scoresArr);

        // Find the best match
        for (var i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i] === findLowest) {
                var bestMatch = {
                    name: friends[i].name,
                    photo: friends[i].photo
                };

                res.send(bestMatch);
            }
        }

        // Send new submission to api/friends
        friends.push(newScores);
    });
}