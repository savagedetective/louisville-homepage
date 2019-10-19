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

            console.log(data);

            const tempKelvin = data.main.temp;
            const tempDegrees = (tempKelvin * (9/5) - 459.67).toFixed(1);
            const description = data.weather[0]["description"];

            console.log(`Current temperature is ${tempDegrees}. Weather is ${description}.`);

            $(".temp-holder p").text(tempDegrees);
            $(".temp-holder p").after(`<p>${description}</p>`);


        }).catch((err) => {
            console.log(err);
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
    setInterval(progressBar, 6000);
});