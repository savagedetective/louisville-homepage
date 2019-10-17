module.exports = function(app) {
    app.get("/weather", function(req, res) {

        const API_KEY = process.env.API_KEY;
        const URL = "api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=" + API_KEY;

        
    });
};