var axios = require("axios");

module.exports = function (app) {
    app.get("/api/weather", function (req, res) {

        console.log("API weather hit");

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

    app.get("/api/forecast", function (req, res) {

        console.log("API forecast hit");

        const api = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?zip=40204&forecast.temperature.min&forecast.temperature.max&appid=${api}`

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