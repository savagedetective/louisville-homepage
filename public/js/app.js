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
            const main = $(".temp-holder");
            const one = $(".dayOne");
            const two = $(".dayTwo")
            const three = $(".dayThree");
            const four = $(".dayFour");
            const five = $(".dayFive");

            const temp = (data.currently.temperature).toFixed(1);
            const description = data.daily.data[0]["summary"];
            const min = (data.daily.data[0]["temperatureLow"]).toFixed(0);
            const max = (data.daily.data[0]["temperatureHigh"]).toFixed(0);
            const zeroIcon = data.daily.data[0]["icon"];

            const oneMin = (data.daily.data[1]["temperatureLow"]).toFixed(0);
            const oneMax = (data.daily.data[1]["temperatureHigh"]).toFixed(0);
            const oneDesc = data.daily.data[1]["summary"];
            const oneIcon = data.daily.data[1]["icon"];

            const twoMin = (data.daily.data[2]["temperatureLow"]).toFixed(0);
            const twoMax = (data.daily.data[2]["temperatureHigh"]).toFixed(0);
            const twoDesc = data.daily.data[2]["summary"];
            const twoIcon = data.daily.data[2]["icon"];

            const threeMin = (data.daily.data[3]["temperatureLow"]).toFixed(0);
            const threeMax = (data.daily.data[3]["temperatureHigh"]).toFixed(0);
            const threeDesc = data.daily.data[3]["summary"];
            const threeIcon = data.daily.data[3]["icon"];

            const fourMin = (data.daily.data[4]["temperatureLow"]).toFixed(0);
            const fourMax = (data.daily.data[4]["temperatureHigh"]).toFixed(0);
            const fourDesc = data.daily.data[4]["summary"];
            const fourIcon = data.daily.data[4]["icon"];

            main.html(`<p>Just this second...</p>`)
                .append(`<p>${temp}</p>`);

            one.html(`<p>${dayZero}`)
                .attr("data-icon", zeroIcon)
                .append(`<p>${min} - ${max}`)
                .append(`<p>${description}`);

            two.html(`<p>${dayOne}`)
                .attr("data-icon", oneIcon)
                .append(`<p>${oneMin} - ${oneMax}`)
                .append(`<p>${oneDesc}`);

            three.html(`<p>${dayTwo}`)
                .attr("data-icon", twoIcon)
                .append(`<p>${twoMin} - ${twoMax}`)
                .append(`<p>${twoDesc}`);

            four.html(`<p>${dayThree}`)
                .attr("data-icon", threeIcon)
                .append(`<p>${threeMin} - ${threeMax}`)
                .append(`<p>${threeDesc}`);

            five.html(`<p>${dayFour}`)
                .attr("data-icon", fourIcon)
                .append(`<p>${fourMin} - ${fourMax}`)
                .append(`<p>${fourDesc}`);

            console.log(`Today is ${dayZero}. Current temperature is ${temp}. Weather is ${description}.`);

        }).then(function() {
            addBackgrounds();
        })
            .catch((err) => {
                console.log(err);
            });

    }


    function addBackgrounds() {

        const dayDivs = $(".five-day > div");

        for (i = 0; i < dayDivs.length; i++) {

            let bg = dayDivs[i].getAttribute("data-icon");

            switch (bg) {
                case "rain":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/rain.png")');
                break;
                case "partly-cloudy-day":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/partlyCloudyDay.png")');
                break;
                case "partly-cloudy-night":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/partlyCloudyNight.png")');
                break;
                case "clear-day":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/clear.png")');
                break;
                case "clear-night":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/clearNight.png")');
                break;
                case "snow":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/snow.png")');
                break;
                case "sleet":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/snow.png")');
                break;
                case "wind":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/windy.png")');
                break;
                case "fog":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/cloudy.png")');
                break;
                case "cloudy":
                dayDivs[i].setAttribute('style', 'background-image: url("../images/cloudy.png")');
                break;
            }
        }

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
    setInterval(progressBar, 6000);
});