//Goal: Make a 10 card memory game - users must be able to select two cards and check if they are a match. If they are a match, they stay flipped. If not, they flip back over. Game is done when all cards are matched and flipped over.

const cards = document.querySelectorAll('.card');


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 5;

// Shuffle cards
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Start or reset game
function startGame() {
  matchesFound = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // The 5 cards/images
  const baseImages = [
    'Images/PHI.svg',
    'Images/Philadelphia_Flyers.svg',
    'Images/Philadelphia_Union_2018_logo.svg.png',
    'Images/philadelphia_phillies_logo_primary_19922235.png',
    'Images/Philadelphia_76ers_logo.svg'
  ];

  //shuffle
  const imagePairs = [...baseImages, ...baseImages];
  const shuffled = shuffle(imagePairs);

  //Images for the cards
  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    img.src = 'Images/SouthPhillyComplex.jpg'; // show back side
    card.dataset.src = shuffled[index]; // store real image
    card.classList.remove('flipped', 'matched');
  });
}

// Flip card
function flipCard(event) {
  if (lockBoard) return; // prevent too many clicks

  const card = event.currentTarget;
  const img = card.querySelector('img');

  if (card.classList.contains('matched') || card === firstCard) return;

  // Card reveal
  img.src = card.dataset.src;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  //Second card flip
  secondCard = card;
  lockBoard = true;

  //Check for match
  if (firstCard.dataset.src === secondCard.dataset.src) {
    //If Match found-
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchesFound++;
    resetFlip();
  } else {
    //If no match found
    setTimeout(() => {
      firstCard.querySelector('img').src = 'Images/SouthPhillyComplex.jpg';
      secondCard.querySelector('img').src = 'Images/SouthPhillyComplex.jpg';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetFlip();
    }, 900);
  }
}

// Reset flipped cards
function resetFlip() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

//event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
document.getElementById('startBtn').addEventListener('click', startGame);


startGame();
