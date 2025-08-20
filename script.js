// Emojis do teclado do Windows
const emojis = ['😀','🐱','🍕','🚗','🌵','⚽','🎲','🎵'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  matches = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Cria pares e embaralha
  cards = shuffle([...emojis, ...emojis]);
  cards.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = idx;
    card.textContent = '❓'; // Verso da carta
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.currentTarget;
  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  
  card.textContent = card.dataset.emoji;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else if (firstCard && !secondCard) {
    secondCard = card;
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches += 1;
    if (matches === emojis.length) {
      setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 300);
    }
  } else {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '❓';
    secondCard.textContent = '❓';
  }
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

restartBtn.addEventListener('click', createBoard);

// Inicializa o jogo
createBoard();
