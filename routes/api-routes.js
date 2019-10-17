var fetch = require("node-fetch");
var axios = require("axios");

module.exports = function (app) {
    app.get("/api/weather", function (req, res) {

        console.log("API route hit");

        const api = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=40204&appid=${api}`

        axios.get(url)
            .then(function(results) {

                const data = results.data;
                res.json(data);

            })
                .catch((err) => {
                    console.log(err);
                });
        
    });
};