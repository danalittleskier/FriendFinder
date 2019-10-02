var friendsList = require("../data/friends");

module.exports = function (app) {
    app.get("/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/friends", function (req, res) {
        friendsList.push(req.body);
    });
}