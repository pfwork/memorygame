/*
 * Create a list that holds all of your cards
 */
 // This array holds the currently clicked cards
let openCardsList = [];

let counter = 0;

let matchedCardsCount = 0;

let seconds = 0;

var startTime, endTime;

var timeOut;

newDeck();

// Add a eventlistener to the restart button
document.getElementById('repeat').addEventListener('click', newDeck);

function newDeck() {

  let cards = [];

  let findI = document.querySelectorAll(".deck i");

  for(i = 0; i < findI.length; i++) {
    cards[i] = findI[i].className;
  }
  //Shuffle cards
  const newCards = shuffle(cards);

  //Put shuffled cards on the screen
  for (i = 0; i < findI.length; i++) {
    findI[i].className = cards[i];
  }

  //Restart a new deck of cards
  var myList = document.querySelectorAll(".deck li");

  for (i = 0; i < myList.length; i++) {
    myList[i].className = "card";
  }

  // Clear open cards list when restart button is clicked
  openCardsList.length = 0;
  counter = 0;
  document.querySelector(".moves").textContent = counter;
}

// Make each card on the deck clickable
document.getElementById('cardDeck').addEventListener('click', displayCard);

// When a card is clicked, display it on the deck
function displayCard(evt) {
  console.log("displayCard function is called");
  let classNames = evt.target.classList;

  if ((evt.target.nodeName === 'LI') && (openCardsList.length < 2)){
    // If a card is clicked multiple times, only one click is counted
    if (!(classNames.contains("open", 'show'))) {
      counter += 1;
      classNames.add('open', 'show');
      document.querySelector(".moves").textContent = counter;
      openCards(evt.target.id);
    }
  }

  if (counter === 1) {
    startTimer();
    console.log("Timer started");
  }
}

// When a card is clicked, push it's id into an array
function openCards(id) {
  console.log("openCards called on id: " + id);

  openCardsList.push(id);
  if(openCardsList.length === 2) {
    checkMatch();
  }

  console.log("openCardsList array has: " + openCardsList[0] + " " + openCardsList[1]);
  console.log(openCardsList);

}

// This function is to check if the two opend cards match
function checkMatch() {

  console.log("checkMatch() function is called");
  var cardOneClassName = document.getElementById(openCardsList[0]).firstElementChild.className;
  var cardTwoClassName = document.getElementById(openCardsList[1]).firstElementChild.className;
  console.log("OC array has: " + cardOneClassName + " " + cardTwoClassName);


  if (cardOneClassName === cardTwoClassName) {
      console.log('you got it!');

      matchedCards();
    }
  else {
      console.log('oh, no!');
      // To have a game effect, need to show the opened cards for a short time, then close it
      setTimeout(function()
      {
        closeCards();

      }, 500);

  }
}

// if two cards match, stay in the match position
function matchedCards() {

  for(i = 0; i < openCardsList.length; i++) {
    document.getElementById(openCardsList[i]).classList.add('match');
    document.getElementById(openCardsList[i]).classList.remove('open', 'show');
  }

  openCardsList.length=0;
  matchedCardsCount += 2;
  console.log("matched cards are now " + matchedCardsCount);
  if (matchedCardsCount === 16) {
    myModal();
    stopTimer();
    console.log("Time elapsed " + seconds);
  }
}

// If two cards don't match, hide cards simbol
function closeCards()
{
  console.log("close cards function called");
  document.getElementById(openCardsList[1]).className = "card";
  document.getElementById(openCardsList[0]).className = "card";
  openCardsList.length = 0;
}

// Modal box function
function myModal() {
  // Get the modal
  var modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}

function startTimer() {
  startTime = new Date();
}
function stopTimer() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  seconds = Math.round(timeDiff);
  console.log(seconds);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
