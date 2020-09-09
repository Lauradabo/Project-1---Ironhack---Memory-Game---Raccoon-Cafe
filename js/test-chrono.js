
var intervalId;
var timeFull = 3 * 60;
var timeRemaining = timeFull;
var timePassed = 0;

function startClick() {
    intervalId = setInterval(function tick() {
     console.log("tick", timeRemaining);
     timeRemaining--;
     timePassed++;

    }, 1000); // setInterval execute tick toutes les 1000 ,s
}



function stopClick() {
    clearInterval(intervalId);
}


startClick()