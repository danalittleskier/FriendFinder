var path = require("path");

module.exports = function (app) {

  app.get("/images/hearts.jpg", function (req, res) {
    res.sendFile(path.join(__dirname, "../images/hearts.jpg"));
  });

  app.get("/css/style.css", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/css/style.css"));
  });

  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // If no matching route is found default to home
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
