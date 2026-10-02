// --- ESTADO DO JOGO ---
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'hard';
let isMuted = false;

// Nomes dos Jogadores
let playerNames = {
  X: 'Jogador X',
  O: 'IA (Imbatível)'
};

// Placar
let scores = { X: 0, O: 0, ties: 0 };

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// --- ELEMENTOS DO DOM ---
const registrationScreen = document.getElementById('registration-screen');
const gameContainer = document.getElementById('game-container');
const playerForm = document.getElementById('player-form');
const p1Input = document.getElementById('p1-name');
const p2Input = document.getElementById('p2-name');
const p2Group = document.getElementById('p2-group');

const nameXText = document.getElementById('name-x');
const nameOText = document.getElementById('name-o');
const scoreXText = document.getElementById('score-x');
const scoreOText = document.getElementById('score-o');
const scoreTiesText = document.getElementById('score-ties');

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const modeSelect = document.getElementById('mode-select');
const restartBtn = document.getElementById('restart-btn');
const changePlayersBtn = document.getElementById('change-players-btn');
const soundBtn = document.getElementById('sound-btn');
const soundIcon = document.getElementById('sound-icon');

// --- EFEITOS SONOROS (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (isMuted) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'x') {
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'o') {
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'win') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.1);
    osc.frequency.setValueAtTime(783.99, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'draw') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.25);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  }
}

// --- LÓGICA DE CADASTRO E LOCALSTORAGE ---
function loadSavedPlayers() {
  const savedP1 = localStorage.getItem('player1_name');
  const savedP2 = localStorage.getItem('player2_name');

  if (savedP1) p1Input.value = savedP1;
  if (savedP2) p2Input.value = savedP2;
}

playerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const p1 = p1Input.value.trim() || 'Jogador X';
  let p2 = p2Input.value.trim();

  if (gameMode !== 'pvp') {
    p2 = gameMode === 'easy' ? 'IA (Fácil)' : 'IA (Imbatível)';
  } else if (!p2) {
    p2 = 'Jogador O';
  }

  playerNames.X = p1;
  playerNames.O = p2;

  // Salvar no LocalStorage
  localStorage.setItem('player1_name', p1);
  if (gameMode === 'pvp') localStorage.setItem('player2_name', p2);

  // Esconder Tela de Cadastro e Mostrar Jogo
  registrationScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');

  updateDisplayNames();
  restartRound();
});

function updateDisplayNames() {
  nameXText.textContent = playerNames.X;
  nameOText.textContent = playerNames.O;
}

// Alternar exibição do campo do Jogador 2 se for contra a IA
modeSelect.addEventListener('change', (e) => {
  gameMode = e.target.value;

  if (gameMode === 'pvp') {
    p2Group.classList.remove('hidden');
    p2Input.required = true;
    playerNames.O = p2Input.value.trim() || 'Jogador O';
  } else {
    p2Group.classList.add('hidden');
    p2Input.required = false;
    playerNames.O = gameMode === 'easy' ? 'IA (Fácil)' : 'IA (Imbatível)';
  }

  updateDisplayNames();
  restartRound();
});

// Botão Trocar Jogadores
changePlayersBtn.addEventListener('click', () => {
  registrationScreen.classList.remove('hidden');
  gameContainer.classList.add('hidden');
});

// --- LÓGICA DO TABULEIRO ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartRound);
soundBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  soundIcon.textContent = isMuted ? '🔇' : '🔊';
});

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  makeMove(index, currentPlayer);

  if (gameActive && gameMode !== 'pvp' && currentPlayer === 'O') {
    setTimeout(makeAIMove, 300);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add(player.toLowerCase());
  cells[index].disabled = true;

  playSound(player.toLowerCase());

  if (checkWinner(player)) {
    handleWin(player);
  } else if (board.every(cell => cell !== '')) {
    handleDraw();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function updateStatus() {
  const currentName = playerNames[currentPlayer];
  statusText.textContent = `Vez de: ${currentName}`;
}

function checkWinner(player) {
  return WINNING_COMBINATIONS.some(combo => 
    combo.every(index => board[index] === player)
  );
}

function handleWin(player) {
  gameActive = false;
  scores[player]++;
  updateScores();
  playSound('win');

  const winnerName = playerNames[player];
  statusText.textContent = `${winnerName} Venceu! 🎉`;

  const winningCombo = WINNING_COMBINATIONS.find(combo => 
    combo.every(index => board[index] === player)
  );
  if (winningCombo) {
    winningCombo.forEach(idx => cells[idx].classList.add('winner'));
  }
}

function handleDraw() {
  gameActive = false;
  scores.ties++;
  updateScores();
  playSound('draw');
  statusText.textContent = 'Empate! 🤝';
}

function updateScores() {
  scoreXText.textContent = scores.X;
  scoreOText.textContent = scores.O;
  scoreTiesText.textContent = scores.ties;
}

// --- INTELIGÊNCIA ARTIFICIAL ---
function makeAIMove() {
  if (!gameActive) return;
  const bestMove = gameMode === 'easy' ? getRandomMove() : getBestMove();
  if (bestMove !== null && bestMove !== undefined) {
    makeMove(bestMove, 'O');
  }
}

function getRandomMove() {
  const empty = board.map((v, i) => (v === '' ? i : null)).filter(v => v !== null);
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(currentBoard, depth, isMaximizing) {
  if (checkWinner('O')) return 10 - depth;
  if (checkWinner('X')) return depth - 10;
  if (currentBoard.every(cell => cell !== '')) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === '') {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, depth + 1, false);
        currentBoard[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === '') {
        currentBoard[i] = 'X';
        let score = minimax(currentBoard, depth + 1, true);
        currentBoard[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function restartRound() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  updateStatus();

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.disabled = false;
  });
}

// Carregar dados salvos ao iniciar
loadSavedPlayers();