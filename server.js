var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

// // Routes
// require("./app/routes/api-routes.js")(app);
// require("./app/routes/html-routes.js")(app);

app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

app.listen(PORT, function() {
  console.log("Goliath online: " + PORT);
});
