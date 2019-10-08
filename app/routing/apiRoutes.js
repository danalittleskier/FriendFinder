var friendsList = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function (req, res) {
        var totalDifference = 0;
        var firstTime = true;
        var matchArray = [];

        //for each score calculate the difference between answers and add to the totalDifernce
        friendsList.forEach(friend => {
            for (let i = 0; i < 10; i++) {
                    totalDifference += Math.abs(friend.scores[i] - req.body.scores[i]);    
            }
            console.log("totalDifference = "+totalDifference);
            //push the first match into the matchArray for further comparasing with other matches
            if(!matchArray || !matchArray.length){
                var newMatch = {
                    name: friend.name,
                    photo: friend.photo,
                    totalDifference: totalDifference
                }
                console.log("first match "+newMatch.name);
                matchArray.push(newMatch);
            }
            //compare to the next friend from the friendsList and add to matchArray if the totalDifference is closer
            else if (matchArray[matchArray.length-1].totalDifference > totalDifference){
                var secondMatch = {
                    name: friend.name,
                    photo: friend.photo,
                    totalDifference: totalDifference
                }
                console.log("Second match "+secondMatch.name);
                matchArray.pop(matchArray[matchArray.length-1]);
                matchArray.push(secondMatch);
            }
            totalDifference = 0;
        });
        //push the friend from the form in the friendList to compare with others
        friendsList.push(req.body);
        //return the closest match
        res.json(matchArray[matchArray.length-1]);
    });
}