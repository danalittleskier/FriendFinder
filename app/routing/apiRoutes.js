var friendsList = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function (req, res) {
        var totalDifference = 0;
        var firstTime = true;
        var matchArray = [];

        friendsList.forEach(friend => {
            for (let i = 0; i < 10; i++) {
                    totalDifference += Math.abs(friend.scores[i] - req.body.scores[i]);    
            }
            console.log("total difference = "+totalDifference);
            if(!matchArray || !matchArray.length){
                var newMatch = {
                    name: friend.name,
                    photo: friend.photo,
                    totalDifference: totalDifference
                }
                console.log("first match "+newMatch.name);
                matchArray.push(newMatch);
            }
            else if (matchArray[matchArray.length-1].totalDifference > totalDifference){
                var secondMatch = {
                    name: friend.name,
                    photo: friend.photo,
                    totalDifference: totalDifference
                }
                console.log("Second match "+secondMatch.name);
                matchArray.push(secondMatch);
            }
            totalDifference = 0;
        });
        friendsList.push(req.body);
        res.json(matchArray[matchArray.length-1]);
    });
}