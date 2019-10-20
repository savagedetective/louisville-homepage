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

            const tempKelvin = data.main.temp;
            const tempDegrees = (tempKelvin * (9 / 5) - 459.67).toFixed(1);
            const description = data.weather[0]["description"];
            const minK = (data.main.temp_min);
            const minD = (minK * (9 / 5) - 459.67).toFixed(0);
            const maxK = data.main.temp_max;
            const maxD = (maxK * (9 / 5) - 459.67).toFixed(0);

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

            console.log(`Today is ${day}. Current temperature is ${tempDegrees}. Weather is ${description}.`);

            $(".temp-holder").html(`<p>${tempDegrees}</p>`);
            $(".temp-holder").append(`<p>${description}</p>`);
            $(".dayZero").html(`<p>${day}</p>`);
            $(".dayZero").append(`<p>${minD} - ${maxD}`);
            $(".dayZero").append(`<p>${description}</p>`);

        }).catch((err) => {
            console.log(err);
        });


    }

    function setForecast() {

        $.get("/api/forecast").then(function (data) {

            const dayOneKMin = data.list[2]["main"]["temp"];
            const dayOneDmin = (dayOneKMin * (9 / 5) - 459.67).toFixed(0);
            const dayOneKMax = data.list[6]["main"]["temp"];
            const dayOneDMax = (dayOneKMax * (9 / 5) - 459.67).toFixed(0);
            const dayOneDesc = data.list[2]["weather"][0]["description"];

            const dayTwoKMin = data.list[10]["main"]["temp"];
            const dayTwoDMin = (dayTwoKMin * (9 / 5) - 459.67).toFixed(0);
            const dayTwoKMax = data.list[14]["main"]["temp"];
            const dayTwoDMax = (dayTwoKMax * (9 / 5) - 459.67).toFixed(0);
            const dayTwoDesc = data.list[10]["weather"][0]["description"];

            const dayThreeKMin = data.list[19]["main"]["temp"];
            const dayThreeDmin = (dayThreeKMin * (9 / 5) - 459.67).toFixed(0);
            const dayThreeKMax = data.list[23]["main"]["temp"];
            const dayThreeDMax = (dayThreeKMax * (9 / 5) - 459.67).toFixed(0);
            const dayThreeDesc = data.list[19]["weather"][0]["description"];

            const dayFourKMin = data.list[27]["main"]["temp"];
            const dayFourDmin = (dayFourKMin * (9 / 5) - 459.67).toFixed(0);
            const dayFourKMax = data.list[31]["main"]["temp"];
            const dayFourDMax = (dayFourKMax * (9 / 5) - 459.67).toFixed(0);
            const dayFourDesc = data.list[27]["weather"][0]["description"];

            let dayZero;
            let dayOne;
            let dayTwo;
            let dayThree;
            let dayFour;

            switch (new Date().getDay()) {
                case 0:
                    dayZero = "Sunday";
                    dayOne = "Monday";
                    dayTwo = "Tuesday";
                    dayThree = "Wednesday";
                    dayFour = "Thursday";
                    break;
                case 1:
                    dayZero = "Monday";
                    dayOne = "Tuesday";
                    dayTwo = "Wednesday";
                    dayThree = "Thursday";
                    dayFour = "Friday";
                    break;
                case 2:
                    dayZero = "Tuesday";
                    dayOne = "Wednesday";
                    dayTwo = "Thursday";
                    dayThree = "Friday";
                    dayFour = "Saturday";
                    break;
                case 3:
                    dayZero = "Wednesday";
                    dayOne = "Thursday";
                    dayTwo = "Friday";
                    dayThree = "Saturday";
                    dayFour = "TSunday";
                    break;
                case 4:
                    dayZero = "Thursday";
                    dayOne = "Friday";
                    dayTwo = "Saturday";
                    dayThree = "Sunday";
                    dayFour = "Monday";
                    break;
                case 5:
                    dayZero = "Friday";
                    dayOne = "Saturday";
                    dayTwo = "Sunday";
                    dayThree = "Monday";
                    dayFour = "Tuesday";
                    break;
                case 6:
                    dayZero = "Saturday";
                    dayOne = "Sunday";
                    dayTwo = "Monday";
                    dayThree = "Tuesday";
                    dayFour = "Wednesday";
            }

            const one = $(".dayOne");
            const two = $(".dayTwo")
            const three = $(".dayThree");
            const four = $(".dayFour");

            one.html(`<p>${dayOne}`);
            one.append(`<p>${dayOneDmin} - ${dayOneDMax}`);
            one.append(`<p>${dayOneDesc}`);

            two.html(`<p>${dayTwo}`);
            two.append(`<p>${dayTwoDMin} - ${dayTwoDMax}`);
            two.append(`<p>${dayTwoDesc}`);

            three.html(`<p>${dayThree}`);
            three.append(`<p>${dayThreeDmin} - ${dayThreeDMax}`);
            three.append(`<p>${dayThreeDesc}`);

            four.html(`<p>${dayFour}`);
            four.append(`<p>${dayFourDmin} - ${dayFourDMax}`);
            four.append(`<p>${dayFourDesc}`);

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
    setForecast();
    setInterval(progressBar, 6000);
});