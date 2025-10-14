//variables for the game
const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 5;

// Shuffle function (Fisher-Yates)
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Start / shuffle game
function startGame() {
  matchesFound = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Get all data-src and shuffle
  const srcList = Array.from(cards).map(c => c.dataset.src);
  const shuffled = shuffle(srcList);

  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    img.src = 'Images';
    card.dataset.src = shuffled[index];
    card.classList.remove('flipped', 'matched');
  });

  document.getElementById('status').textContent = 'Cards shuffled — find all the pairs!';
}

// Flip card function
function flipCard(event) {
  if (lockBoard) return;

  const card = event.currentTarget;
  const img = card.querySelector('img');

  if (card.classList.contains('matched') || card === firstCard) return;

  img.src = card.dataset.src;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchesFound += 1;
    resetFlip();

    if (matchesFound === totalPairs) {
      document.getElementById('status').textContent = 'You found all pairs — great job!';
    }
  } else {
    setTimeout(() => {
      firstCard.querySelector('img').src = 'Images';
      secondCard.querySelector('img').src = 'Images';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetFlip();
    }, 900);
  }
}

function resetFlip() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Attach event listeners
cards.forEach(card => card.addEventListener('click', flipCard));
document.getElementById('startBtn').addEventListener('click', startGame);

// Start first game
startGame();
