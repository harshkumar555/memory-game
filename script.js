// script.js

const gameBoard = document.querySelector('.game-board');
const timerDisplay = document.getElementById('timer');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues]; // Duplicate cards for matching
let flippedCards = [];
let matchedCards = 0;
let gameOver = false;
let startTime = null;
let timerInterval = null;

// Function to shuffle the cards
function shuffleCards() {
  return cards.sort(() => Math.random() - 0.5);
}

// Create and display the cards
function createCards() {
  const shuffledCards = shuffleCards();

  shuffledCards.forEach((value, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = value;
    cardElement.addEventListener('click', handleCardClick);
    gameBoard.appendChild(cardElement);
  });
}

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
}

// Update the timer display
function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsedTime}s`;
}

// Handle card click events
function handleCardClick(e) {
  const clickedCard = e.target;

  if (flippedCards.length === 2 || clickedCard.classList.contains('matched') || flippedCards.includes(clickedCard)) {
    return; // Ignore clicks if two cards are already flipped or card is matched
  }

  // Start the timer when the first card is clicked
  startTimer();

  // Flip the clicked card
  clickedCard.classList.add('flip');
  clickedCard.textContent = clickedCard.dataset.value;
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cards.length) {
      gameOver = true;
      clearInterval(timerInterval); // Stop the timer
      setTimeout(() => alert(`You win! Time: ${Math.floor((Date.now() - startTime) / 1000)}s`), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.textContent = '';
      secondCard.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

// Initialize the game
createCards();
