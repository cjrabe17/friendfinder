var friendData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        console.log("api/friends get");
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        console.log("api/friends post");
        // A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic

        var newScores = req.body;
        console.log(newScores);

        var scoresArray = [];
        friendData.forEach(friendScore => {
            var scoreTotal = 0;
            for (var i = 0; i < 10; i++) {
                scoreTotal += Math.abs(newScores.scores[i] - friendScore.scores[i]);
            }

            scoresArray.push(scoreTotal);
        });

        // Find a match
        var findLowest = Math.min.apply(null, scoresArray);

        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] === findLowest) {
                var bestMatch = {
                    name: friendData[i].name,
                    photo: friendData[i].photo
                };

                res.send(bestMatch);
            }
        }

        friendData.push(newScores);
        console.log(friendData);
    });
}