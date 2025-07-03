// "cards" contains an array of images corresponding to cards going from lowest value to highest.
// we will shuffle these cards and store them in "shuffledCards", the first card will be revealed while the rest hidden
// the player will have to guess if the next card is higher or lower and if the guess is correct the next card is revealed.
// in order to do that, we will take the last revealed and the next card and we will compare their corresponding indexes from the "cards" array, not "shuffledCards".
const cardsSource = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg', '11.svg', '12.svg', '13.svg']; //i don't remember why I have this line
let cards = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg', '11.svg', '12.svg', '13.svg']; //our initial set of cards in ascending order, we need them like this so that their indexes are also in ascending value, which will be important when we will compare the cards if they are higher or lower
let shuffledCards = []; //where we store the shuffled cards
let shuffledIndexes = []; //used in the "shuffle()" function. Here we store the indexes of the elements of "cards" array, but in the same order as they are shuffled in the "shuffledCards" array. We do this because we have to compare the value of the cards from "shuffledCards" array, but we can't compare svg files so we use the indexes stored in "shuffledIndexes" instead, hence why I declared this outside of the "shuffle()" function


//the function that will shuffle the cards:
function shuffle(array) {  // I don't think I actually need a placeholder, should I put "cards" straightfoward instead of "array"?
    let i = 0; //we initialise the variable i at 0
    while(i < array.length) { //as long as i is smaller than the amount of cards:
        let randomIndex = Math.floor(Math.random() * array.length); //we pick a random index from the array we want to shuffle
        if (!shuffledIndexes.includes(randomIndex)) { //if the randomIndex is not included in shuffledIndexes array
            shuffledCards.push(array[randomIndex]); //then we store its corresponding element in shuffledCards array
            shuffledIndexes.push(randomIndex); //then we store the used indexes so we don't repeat them
            i++; //then we increase i by 1 and when i will be bigger than the amount of cards, the loop stops, this way we go through each card
        }
    }
    console.log(shuffledCards); //this line only to check in browser console if the function shuffles the cards array
    console.log(shuffledIndexes);//this line only to check in browser console if the function shuffles the cards array
    return shuffledCards; //new "shuffledCards" is declared
}

shuffle(cards); //initialising the game


//The first card has to be revealed:
const firstCardDiv = document.getElementById("first-card"); //We select the div that will contain the image of the first card
const firstCard = shuffledCards[0]; //check commentary line 40
const imgElement = document.createElement("img"); //we create an img element
imgElement.src = firstCard; //that will have the src set to the first image from "shuffledCards", I'm not sure if I should delete line 38 and just simply have this "imgElement.src = shuffledCards[0];"
firstCardDiv.appendChild(imgElement); //I think we use this method instead of ".innerHTML" because the src of the img changes each game

//the rest of the cards are hidden:
const hiddenCards = document.querySelectorAll('.hidden-card'); //we sellect all the divs with ".hidden-card" class
hiddenCards.forEach(div => { //and for all those divs:
  div.innerHTML = '<img src="0.svg">'; //we make an img with src set to the upside down card face
});

//initialising buttons:
const higherButton = document.querySelector('#buttons button:nth-child(1)'); //#buttons div contains two buttons, i can either go back and give each button specific id and select that, or i can use this method to target which button i want from inside the #buttons div
const lowerButton = document.querySelector('#buttons button:nth-child(2)');

//When player clicks either button, next card in the sequence will be revealed
let cardIndex = 0; //this will keep track as we go through each card in the "shuffledCards" array one by one
function revealNextCard() {
    if (cardIndex < hiddenCards.length) { //hiddenCards is a nodelist but acts like an array, using .length will actually return how many elements are in it
        cardIndex++; //going to the next card because the first one is already revealed
        hiddenCards[cardIndex-1].querySelector('img').src = shuffledCards[cardIndex]; //hiddenCards length is one smaller than shuffledCards length, so to adjust for the offset, hiddenCards[cardIndex-1] will take image from shuffledCards[cardIndex]
    }
}

//When player clicks higher button, we will check if the next card is higher than the currently revealed card, viceversa for lower button, if correct than next card is revealed:

const victoryMessage = document.getElementById('victory-message');
higherButton.addEventListener('click', function() {
    const currentCardIndex = shuffledIndexes[0];
    const nextCardIndex = shuffledIndexes[1];
    revealNextCard();

    if (currentCardIndex < nextCardIndex) {
        shuffledIndexes.shift();
        if (shuffledIndexes.length === 1) {
            victoryMessage.innerHTML = "You Won!";
            higherButton.disabled = true;
            lowerButton.disabled = true;
        }
    } else {
        victoryMessage.innerHTML = "You Lost!";
        higherButton.disabled = true;
        lowerButton.disabled = true;
    }

    console.log(shuffledIndexes);
    console.log(currentCardIndex);
    console.log(nextCardIndex);
});

lowerButton.addEventListener('click', function() {
    const currentCardIndex = shuffledIndexes[0];
    const nextCardIndex = shuffledIndexes[1];
    revealNextCard();

    if (currentCardIndex > nextCardIndex) {
        shuffledIndexes.shift();
        if (shuffledIndexes.length === 1) {
            victoryMessage.innerHTML = "You Won!";
            higherButton.disabled = true;
            lowerButton.disabled = true;
        }
    } else {
        victoryMessage.innerHTML = "You Lost!";
        higherButton.disabled = true;
        lowerButton.disabled = true;
    }

    console.log(shuffledIndexes);
    console.log(currentCardIndex);
    console.log(nextCardIndex);
});