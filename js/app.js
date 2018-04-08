/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
const deck = document.querySelector('.deck');
let moves = document.querySelector('#moves');
let countMoves = 0;
let stars = document.querySelector('#stars');
const star = '<li><i class="fa fa-star"></i></li>';
let openedCards = [];
let interval; 
let min = 0;
let sec = 0;
let timer = document.querySelector('#timer');
let matchedCard = document.getElementsByClassName('match');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//convert list into array from https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
let cardsArray = [];

function listToArray(list) {
  for (let i = 0; i < list.length; i++) { 
    cardsArray[i] = list[i];
  }
  return cardsArray;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = startGame();

function startGame() {
	document.getElementById('congrats').style.visibility = 'hidden';
	resetTimer();
	stars.innerHTML = star.repeat(3);
	for (var i = 0; i < cards.length; i++){
		cards[i].classList.remove('show', 'open', 'match');
	}
	listToArray(cards);
	shuffle(cardsArray);
	resetTimer();
	cardsArray.forEach(function(e) {
        deck.appendChild(e);
    })
    countMoves = 0;
    moves.innerHTML = countMoves+' Moves';
}

//set up the event listener for a card
for (let i of cardsArray) {
	i.addEventListener('click', function() {
		if (min === 0 && sec === 0) {
		interval = setInterval(timeCounter,1000);
		timeCounter();			
		}
		if (openedCards.length >= 2) return;
		clickedCard(this);
		addToArray(this);
		if (openedCards.length === 2) {
			if (openedCards[0].type === openedCards[1].type) {
				match();
				moveCounter();
			} else {
				unmatch ();
				moveCounter();
			}
		}
		starsRating();
		endGame();
	}
)}

//if a card is clicked
function clickedCard (card_val) {
	displaySymbol(card_val);
}

//add the card to a *list* of "open" cards
function addToArray(card_val) {
	if (openedCards.length < 2) {
	openedCards.push(card_val);
	}
}

//display card's symbol
function displaySymbol (card_val) {
	card_val.classList.toggle('open');
    card_val.classList.toggle('show');
}

//if cards match
function match() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

//if cards don't match
function unmatch() {
	setTimeout(function(){
		openedCards[0].classList.remove('show', 'open');
    	openedCards[1].classList.remove('show', 'open');
    	openedCards = [];
    }, 600);
}

//increment move counter
function moveCounter() {
	countMoves +=1;
	moves.innerHTML = countMoves+' Moves';
}


//set stars rating
function starsRating() {
	if (countMoves >= 0 && countMoves <= 12) {
		stars.innerHTML = star.repeat(3);
	}
	else if (countMoves > 12 && countMoves <= 18) {
		stars.innerHTML = star.repeat(2);
	}
	else {
		stars.innerHTML = star.repeat(1);
	}
}

//set time counter
function timeCounter(){
	timer.innerHTML = 'Time '+min +':'+sec;
	sec+=1;
	if (sec === 60) {
		min+=1;
		sec = 0;
	}
}

//set reset timer
function resetTimer(){
	min = 0;
	sec = 0;
	clearInterval(interval);
	timer.innerHTML = 'Time 0:0';
}

const restart = document.querySelector('#restart');
restart.addEventListener('click',startGame);

//show popup
function endGame(){
	timeStop = timer.innerHTML;
	starsEnd = stars.innerHTML;

	if (matchedCard.length === 16) {
		clearInterval(interval);
		document.querySelector('#congrats').style.visibility = 'visible';
		document.querySelector('#stars').innerHTML = starsEnd;
		document.querySelector('#moves').innerHTML = countMoves + ' moves';
		document.querySelector('#timer').innerHTML = timeStop;
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
