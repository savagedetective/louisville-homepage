$(document).ready(function () {

    console.log("Goliath online.");

    function setDate() {

        const secondHand = document.querySelector(".second-hand");
        const minuteHand = document.querySelector(".min-hand");
        const hourHand = document.querySelector(".hour-hand");
        const allHands = document.querySelectorAll(".hand");

        const now = new Date();
        const seconds = now.getSeconds();
        const secondsToDegree = ((seconds / 60) * 360 + 90);
        const minutes = now.getMinutes();
        const minutesToDegree = ((minutes / 60) * 360 + 90);
        const hours = now.getHours();
        const hoursToDegrees = ((hours / 12) * 360 + 90);

        secondHand.style.transform = `rotate(${secondsToDegree}deg)`;
        minuteHand.style.transform = `rotate(${minutesToDegree}deg)`;
        hourHand.style.transform = `rotate(${hoursToDegrees}deg)`;

        //pauses transition at 12 o'clock so hands don't reset counter-clockwise
        if (secondsToDegree === 90) {
            allHands.forEach(hand => hand.style.transition = "none");
        } else {
            //zeroes out inline transition so "all 0.05" can be reinstated after seconds hand hits 60s.
            allHands.forEach(hand => hand.style.transition = "");
        }
    }

    function setTemp() {

        console.log("Retrieving temperature.");

        $.get("/api/weather").then(function (data) {

            const temp = (data.currently.temperature).toFixed(1);
            const description = data.currently.summary;
            const min = (data.daily.data[0]["temperatureLow"]).toFixed(0);
            const max = (data.daily.data[0]["temperatureHigh"]).toFixed(0);

            let day;

            switch (new Date().getDay()) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
            }

            console.log(`Today is ${day}. Current temperature is ${temp}. Weather is ${description}.`);

            $(".temp-holder").html(`<p>${day}</p>`);
            $(".temp-holder").append(`<p>${temp}</p>`);
            $(".temp-holder").append(`<p>${min} - ${max}. ${description}.`);

        }).catch((err) => {
            console.log(err);
        });


    }

    function setForecast() {

        $.get("/api/forecast").then(function (data) {

            const dayOneKSixAm = data.list[2]["main"]["temp"];
            const dayOneDSixAm = (dayOneKSixAm * (9 / 5) - 459.67).toFixed(0);
            const dayOneKNoon = data.list[4]["main"]["temp"];
            const dayOneDNoon = (dayOneKNoon * (9 / 5) - 459.67).toFixed(0);
            const dayOneKSixPm = data.list[6]["main"]["temp"];
            const dayOneDSixPm = (dayOneKSixPm * (9 / 5) - 459.67).toFixed(0);
            const dayOneDesc = data.list[2]["weather"][0]["description"];

            const dayTwoKSixAm = data.list[10]["main"]["temp"];
            const dayTwoDSixAm = (dayTwoKSixAm * (9 / 5) - 459.67).toFixed(0);
            const dayTwoKNoon = data.list[12]["main"]["temp"];
            const dayTwoDNoon = (dayTwoKNoon * (9 / 5) - 459.67).toFixed(0);
            const dayTwoKSixPm = data.list[14]["main"]["temp"];
            const dayTwoDSixPm = (dayTwoKSixPm * (9 / 5) - 459.67).toFixed(0);
            const dayTwoDesc = data.list[10]["weather"][0]["description"];

            const dayThreeKSixAm = data.list[18]["main"]["temp"];
            const dayThreeDSixAm = (dayThreeKSixAm * (9 / 5) - 459.67).toFixed(0);
            const dayThreeKNoon = data.list[20]["main"]["temp"];
            const dayThreeDNoon = (dayThreeKNoon * (9 / 5) - 459.67).toFixed(0);
            const dayThreeKSixPm = data.list[22]["main"]["temp"];
            const dayThreeDSixPm = (dayThreeKSixPm * (9 / 5) - 459.67).toFixed(0);
            const dayThreeDesc = data.list[18]["weather"][0]["description"];

            const dayFourKSixAm = data.list[26]["main"]["temp"];
            const dayFourDSixAm = (dayFourKSixAm * (9 / 5) - 459.67).toFixed(0);
            const dayFourKNoon = data.list[28]["main"]["temp"];
            const dayFourDNoon = (dayFourKNoon * (9 / 5) - 459.67).toFixed(0);
            const dayFourKSixPm = data.list[30]["main"]["temp"];
            const dayFourDSixPm = (dayFourKSixPm * (9 / 5) - 459.67).toFixed(0);
            const dayFourDesc = data.list[26]["weather"][0]["description"];

            const dayFiveKSixAm = data.list[34]["main"]["temp"];
            const dayFiveDSixAm = (dayFiveKSixAm * (9 / 5) - 459.67).toFixed(0);
            const dayFiveKNoon = data.list[36]["main"]["temp"];
            const dayFiveDNoon = (dayFiveKNoon * (9 / 5) - 459.67).toFixed(0);
            const dayFiveKSixPm = data.list[38]["main"]["temp"];
            const dayFiveDSixPm = (dayFiveKSixPm * (9 / 5) - 459.67).toFixed(0);
            const dayFiveDesc = data.list[34]["weather"][0]["description"];

            let dayZero;
            let dayOne;
            let dayTwo;
            let dayThree;
            let dayFour;
            let dayFive;

            switch (new Date().getDay()) {
                case 0:
                    dayZero = "Sunday";
                    dayOne = "Monday";
                    dayTwo = "Tuesday";
                    dayThree = "Wednesday";
                    dayFour = "Thursday";
                    dayFive = "Friday";
                    break;
                case 1:
                    dayZero = "Monday";
                    dayOne = "Tuesday";
                    dayTwo = "Wednesday";
                    dayThree = "Thursday";
                    dayFour = "Friday";
                    dayFive = "Saturday";
                    break;
                case 2:
                    dayZero = "Tuesday";
                    dayOne = "Wednesday";
                    dayTwo = "Thursday";
                    dayThree = "Friday";
                    dayFour = "Saturday";
                    dayFive = "Sunday";
                    break;
                case 3:
                    dayZero = "Wednesday";
                    dayOne = "Thursday";
                    dayTwo = "Friday";
                    dayThree = "Saturday";
                    dayFour = "Sunday";
                    dayFive = "Monday";
                    break;
                case 4:
                    dayZero = "Thursday";
                    dayOne = "Friday";
                    dayTwo = "Saturday";
                    dayThree = "Sunday";
                    dayFour = "Monday";
                    dayFive = "Tuesday";
                    break;
                case 5:
                    dayZero = "Friday";
                    dayOne = "Saturday";
                    dayTwo = "Sunday";
                    dayThree = "Monday";
                    dayFour = "Tuesday";
                    dayFive = "Wednesday";
                    break;
                case 6:
                    dayZero = "Saturday";
                    dayOne = "Sunday";
                    dayTwo = "Monday";
                    dayThree = "Tuesday";
                    dayFour = "Wednesday";
                    dayFive = "Thursday";
            }

            const one = $(".dayOne");
            const two = $(".dayTwo")
            const three = $(".dayThree");
            const four = $(".dayFour");
            const five = $(".dayFive");

            one.html(`<p>${dayOne}`);
            one.append(`<p>6am: ${dayOneDSixAm}`);
            one.append(`<p>12pm: ${dayOneDNoon}`);
            one.append(`<p>6pm: ${dayOneDSixPm}`);
            one.append(`<p>${dayOneDesc}`);

            two.html(`<p>${dayTwo}`);
            two.append(`<p>6am: ${dayTwoDSixAm}`);
            two.append(`<p>12pm: ${dayTwoDNoon}`);
            two.append(`<p>6pm: ${dayTwoDSixPm}`);
            two.append(`<p>${dayTwoDesc}`);

            three.html(`<p>${dayThree}`);
            three.append(`<p>6am: ${dayThreeDSixAm}`);
            three.append(`<p>12pm: ${dayThreeDNoon}`);
            three.append(`<p>6pm: ${dayThreeDSixPm}`);
            three.append(`<p>${dayThreeDesc}`);

            four.html(`<p>${dayFour}`);
            four.append(`<p>6am: ${dayFourDSixAm}`);
            four.append(`<p>12pm: ${dayFourDNoon}`);
            four.append(`<p>6pm: ${dayFourDSixPm}`);
            four.append(`<p>${dayFourDesc}`);

            five.html(`<p>${dayFive}`);
            five.append(`<p>6am: ${dayFiveDSixAm}`);
            five.append(`<p>12pm: ${dayFiveDNoon}`);
            five.append(`<p>6pm: ${dayFiveDSixPm}`);
            five.append(`<p>${dayFiveDesc}`);

        });

    }

    function progressBar() {

        const bar = $("div.progress-bar");
        let currentWidth = parseInt(bar.attr("aria-valuenow"));
        currentWidth += 1;

        if (currentWidth < 101) {

            bar.attr("aria-valuenow", currentWidth);
            bar.css("width", currentWidth + "%");

        } else {

            bar.attr("aria-valuenow", 0);
            bar.css("width", "0%");

            setTemp();
        }

    }

    //handles motion of clock hands every second.
    setInterval(setDate, 1000);
    setTemp();
    //setForecast();
    setInterval(progressBar, 6000);
    //setInterval(setForecast, 6000);
});