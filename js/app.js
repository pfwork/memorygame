/*
 * Create a list that holds all of your cards
 */
 // This array holds the currently clicked cards
let oc = [];

// this array holds the locked cards
let lockCards = [];

// Add a eventlistener to the restart button
document.getElementById('repeat').addEventListener('click', newDeck);
function newDeck() {
  const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
              "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
              "fa fa-bomb", "fa fa-bomb"];


  //Shuffle cards
  const newCards = shuffle(cards);

  //Put shuffled cards on the screen
  let findI = document.querySelectorAll(".deck i");
  for (i = 0; i < findI.length; i++) {
    findI[i].className = cards[i];
  }

  //Restart a new deck of cards
  var myList = document.querySelectorAll(".deck li");

  for (i = 0; i < myList.length; i++) {
    myList[i].className = "card";
  }
}

document.getElementById('cardDeck').addEventListener('click', displayCard);

function displayCard(evt) {
  console.log("DisplayCard called");
  let classNames = evt.target.classList;
  console.log("clicked cards classes: " + classNames);

  if (evt.target.nodeName === 'LI') {

  if (!(classNames.contains("open"))) {
      classNames.add('open', 'show');
      openCards(evt.target.id);
    }
  }
}

function openCards(id) {

  console.log("openCards called on id: " + id);
  // Do I really need array
  if (oc.length == 0) {
    oc.push(id);
  }
  else {
    rule(id);
  }
  //else {
    // oc.length = 0;
  //}
  console.log(oc);
  // return oc;
}

function rule(id) {

  console.log("rule() function is called");

  var cardOneClassName = document.getElementById(oc[0]).firstElementChild.className;
  var cardTwoClassName = document.getElementById(id).firstElementChild.className;
  console.log("OC array has: " + cardOneClassName + " " + cardTwoClassName);


  if (cardOneClassName === cardTwoClassName) {
      console.log('you got it!');
      // find the match, copy the data to locked array. empty the OC array
      lockCards.push(oc[0]);
      lockCards.push(id);
      oc.length=0;

    }
  else {
      console.log('oh, no!');
      // To have a game effect, need to show the opened cards for a short time, then close it
      setTimeout(function()
      {
        closeCards(id);

      }, 500);

  }
}

function closeCards(id)
{
  console.log("close cards function called");
  document.getElementById(id).className = "card";
  document.getElementById(oc[0]).className = "card";
  oc.length = 0;
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
