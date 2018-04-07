const cardList = document.getElementsByClassName('card');
let cards = [...cardList];
let cardDeck = document.getElementById('allCards');
let openedCards = [];
let cardMatch = document.getElementsByClassName('match');
let moves = 0;
let count = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
let minute = 0;
let seconds = 0;
let timer = document.getElementById('clock');
let matchedCards = 0;
var gameTime;
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
document.body.onload = start();

// Start game function

function start() {
    cards = shuffle(cards);
    for (let card of cards) {
        cardDeck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            cardDeck.appendChild(item);
        });
        card.classList.remove('show', 'open', 'match', 'disable');
    }
    moves = 0;
    count.innerHTML = 'Moves: ' + moves;
    for (let star of stars) {
        star.style.visibility = 'visible';
    }
    matchedCards = 0;
    matches.innerHTML = 'Matches: 0';
    seconds = 0;
    minute = 0;
    timer.innerHTML = 'Timer: 0 minutes 0 s';
    clearInterval(gameTime);
    openedCards = [];
}


let showCard = function () {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disable');
};

//Verifying if the opened cards are identical
function openCards() {
    openedCards.push(this);
    mCounts();
    if (openedCards.length === 2) {
        if (openedCards[0].type === openedCards[1].type) {
            match();
        } else {
            nonMatch();
        }
    }
    matches.innerHTML = 'Matches: ' + matchedCards;
    count.innerHTML = 'Moves: ' + moves;
};


//Function for cards that match
function match() {
    openedCards[0].classList.add('match', 'disable');
    openedCards[1].classList.add('match', 'disable');
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
    matchedCards++;
}


// Function for cards that don't match
function nonMatch() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disabled();
    setTimeout(function () {
        openedCards[0].classList.remove('show', 'open', 'unmatched');
        openedCards[1].classList.remove('show', 'open', 'unmatched');
        enable();
        openedCards = [];
    }, 1100);
}


//Disabling cards for click
function disabled() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disable');
    });
}

//Enabling cards for click
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disable');
        for (let mCard of cardMatch) {
            mCard.classList.add('disable');
        }
    });
}


// Counting the moves and calculating the star rating
function mCounts() {
    moves++;
    count.innerHTML = moves;
    if (moves == 1) {
        startClock();
    }
    if (moves >= 30 && moves <= 40) {

        for (let i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    } else if (moves > 40) {
        for (let i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

// Timer function
function startClock() {
    gameTime = setInterval(function () {
        seconds++;
        clock.innerHTML = 'Timer: ' + minute + ' minutes ' + seconds + ' s';
        if (seconds == 60) {
            minute++;
            seconds = 0;
        }
    }, 1000);
}

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', showCard);
    cards[i].addEventListener('click', openCards);
    cards[i].addEventListener('click', game);
}

//Displaying modal
function game() {
    if (matchedCards == 8) {
        modal.classList.toggle("show-modal");
        clearInterval(gameTime);
        var finalT = timer.innerHTML;
        var finalS = document.querySelector('.stars').innerHTML;
        document.getElementById('finalMoves').innerHTML = moves;
        document.getElementById('finalTime').innerHTML = finalT;
        document.getElementById('finalStars').innerHTML = finalS;
    }
}

//Restarting the game
function restart() {
    modal.classList.remove("show-modal");
    start();
}

//Closing the modal if you click outside it
function windowOnClick(event) {
    if (event.target === modal) {
        game();
    }
}
closeButton.addEventListener("click", game);
window.addEventListener("click", windowOnClick);
