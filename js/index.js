//Import constructor and cards from other JS files :

import {
    MemoryCards
} from "./board.js";
import {
    cards
} from "./cards.js";

//create my board from the class constructor and all the var I will need for my functions : 
const memoryCards = new MemoryCards(cards);
var allCards = null;
var card1 = null;
var card2 = null;
var blockingTime = 1000;

const sound = new Audio("./../sound/neonLight.mp3");

//TIMER : 
const startingMinutes = 2;
let time = startingMinutes * 60;
let intervalId;
const timer = document.getElementById('timer');


sound.oncanplay = (evt) => {
    document.querySelector("#header h1").onmouseover = () => {
        sound.play()
    };
};




function startTimer() {
    time--;
    intervalId = setInterval(function () {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        timer.innerHTML = `${minutes}:${seconds}`;
        time--;
        if (time == -1) {
            stopTimer();
            youLosePopUp();

        }
    }, 1000);

}

function stopTimer() {
    clearInterval(intervalId);
}



//function to block/unblock the cards with toggle : 
function blockCards() {
    function toggleBlockCSS(card) {
        card.classList.toggle('blocked');
    }
    allCards.forEach(toggleBlockCSS); // 1 - block cards through CSS :
    setTimeout(() => {
        allCards.forEach(toggleBlockCSS); // 2- add a 1s delay to unblock cards
    }, blockingTime);
}


// Function to reset card1 and card2 after checking for pairs : 
function resetCards() {
    card1 = null;
    card2 = null;
}

// function to increment score by targetting the element with the written score :
function incrementScore() {
    let wonElement = document.getElementById('pairs-won');
    let value = Number(wonElement.textContent);
    value++;
    wonElement.textContent = value;
}

// function to increment the number of pairs picked : 
function incrementPickedCards() {
    let pickedElement = document.getElementById('pairs-picked');
    let value = Number(pickedElement.textContent);
    value++;
    pickedElement.textContent = value;
}

// function to display the cards :
function drawCards() {
    let html = '';
    memoryCards.cards.forEach(pic => {
        html += `<div class="card" data-card-name="${pic.name}">`;
        html += `<div class="back" name="${pic.img}"></div>`;
        html += `<div class="front" style="background: url(img/${pic.img}) no-repeat; background-size: contain; background-position: center; background-color : white"></div>`;
        html += `</div>`;
    });
    document.querySelector('#board').innerHTML = html;
    allCards = document.querySelectorAll('.card');

}

//function to flip the cards : 
function flipCards() {
    card1.classList.remove("turned");
    card2.classList.remove("turned");
    const wooshSound = new Audio("../sound/wooshSound.mp3");
    wooshSound.volume = 0.6;
    wooshSound.play();
}


// INTRO :
function introPopUp() {
    const introPopUp = document.createElement("div");
    introPopUp.innerHTML += `<div id="intro"><h2>Memory Game</h2><h5>기억력 게임</h5><p>Flip and match pairs of cards
    <br>under 2 minutes to win the game!</p><h5>화이팅 !</h5><button id="start">Let's play!</button></div>`;
    const popUps = document.getElementById("popUps");
    popUps.appendChild(introPopUp);

    introPopUp.querySelector('#start').onclick = () => {
        removeIntroPopUp();
        start();
    };


    //remove Intro pop-ups :
    function removeIntroPopUp() {
        introPopUp.remove();
    }

}

introPopUp();


//function to start the game and shuffle the cards : 
function start() {
    memoryCards.shuffleCards(cards);
    drawCards();
    listenCards();
}
// start();
function reStart() {
    window.location.reload();
}

function listenCards() {
    //add event listener with all the actions happening on a click : 
    allCards.forEach(card => {
        card.addEventListener('click', () => {
            if (intervalId == undefined)
                startTimer();
            card.classList.add('turned');
            console.log(memoryCards.pairsWon);
            if (!card1) card1 = card;
            else card2 = card;

            if (card1 && card2) {
                blockCards(); // block les cartes pendant blockingTime

                let clickedCard1 = card1.getAttribute('data-card-name');
                let clickedCard2 = card2.getAttribute('data-card-name');
                var result = memoryCards.checkPairs(clickedCard1, clickedCard2);

                if (result) {
                    card1.style.pointerEvents = 'none';
                    card2.style.pointerEvents = 'none';
                    const dingSound = new Audio("../sound/ding.mp3");
                    dingSound.volume = 0.6;
                    dingSound.play();
                    incrementScore(); // if the cards match
                    resetCards();
                    youWin();
                } else {
                    // if the cards don't match
                    setTimeout(() => {
                        // 1 - flip cards back in a delay of 1s
                        flipCards();
                        // 2 - count picked cards and add +1
                        incrementPickedCards();
                        // 3 - reset card1 and card2
                        resetCards();
                    }, blockingTime);
                }
            }
            console.log(`Card clicked: ${card}`);
        });
    });
}
//Winning Pop-UP :

function youWinPopUp() {
    const winningPopUp = document.createElement("div");
    winningPopUp.innerHTML += `<div class="pop-up win"><h2>Well done!!</h2><h4>성공! 참 잘했어요!</h4><img src="../img/YouWin.jpg" alt="wining-raccoon"><br>
    <button class="replay">Play Again</button></div>`;
    const popUps = document.getElementById("popUps");
    popUps.appendChild(winningPopUp);

    winningPopUp.querySelector('.replay').onclick = reStart;
}


function youWin() {
    if (memoryCards.pairsWon === cards.length / 2) {
        stopTimer();
        setTimeout(() => {
            youWinPopUp();
        }, 1000);
    }
}

//Loser Pop-up
function youLosePopUp() {
    const losingPopUp = document.createElement("div");
    losingPopUp.innerHTML += `<div class="pop-up lose"><h2>You lose!!</h2><h4>실패! 다시 한 번 도전해보세요!</h4><img src="../img/gifRaccoon.gif" alt="losing-raccoon"><br>
    <button class="replay">Play Again</button></div>`;
    const popUps = document.getElementById("popUps");
    popUps.appendChild(losingPopUp);

    losingPopUp.querySelector('.replay').onclick = reStart;
}