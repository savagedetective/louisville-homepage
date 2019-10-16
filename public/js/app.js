$(document).ready(function () {

    console.log("app.js loaded");

    const secondHand = document.querySelector(".second-hand");
    const minuteHand = document.querySelector(".min-hand");
    const hourHand = document.querySelector(".hour-hand");
    const allHands = document.querySelectorAll(".hand");

    function setDate() {

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

        console.log(hours, minutes, seconds);

        //pauses transition at 12 o'clock so hands don't reset counter-clockwise
        if (secondsToDegree === 90) {
            allHands.forEach(hand => hand.style.transition = "none");
        } else {
            //zeroes out inline transition so "all 0.05" can be reinstated after seconds hand hits 60s.
            allHands.forEach(hand => hand.style.transition = "");
        }
    }
    
    //handles motion of clock hands every second.
    setInterval(setDate, 1000);
});