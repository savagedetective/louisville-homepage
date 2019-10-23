var axios = require("axios");

module.exports = function (app) {
    app.get("/api/weather", function (req, res) {

        console.log("API weather hit");

        const api = process.env.API_KEY;
        const url = `https://api.darksky.net/forecast/${api}/38.235953,-85.720491?exclude=minutely,hourly,alerts,flags`;

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