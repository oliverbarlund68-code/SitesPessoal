/**
 * TETRIS NEON - ENGINE & CONTROLES
 */

// Audio Synthesizer via Web Audio API
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.1) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  move() { this.playTone(300, 0.05, 'square', 0.03); }
  rotate() { this.playTone(450, 0.08, 'triangle', 0.05); }
  drop() { this.playTone(180, 0.12, 'sawtooth', 0.08); }
  clear() {
    this.playTone(523.25, 0.1, 'sine', 0.1);
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.1), 80);
    setTimeout(() => this.playTone(783.99, 0.15, 'sine', 0.1), 160);
  }
  gameover() {
    this.playTone(200, 0.2, 'sawtooth', 0.1);
    setTimeout(() => this.playTone(150, 0.25, 'sawtooth', 0.1), 180);
    setTimeout(() => this.playTone(100, 0.4, 'sawtooth', 0.12), 360);
  }
}

const sfx = new SoundFX();

// Constantes
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const SHAPES = {
  I: { matrix: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: '#00f0ff' },
  J: { matrix: [[1,0,0],[1,1,1],[0,0,0]], color: '#0044ff' },
  L: { matrix: [[0,0,1],[1,1,1],[0,0,0]], color: '#ffaa00' },
  O: { matrix: [[1,1],[1,1]], color: '#ffe600' },
  S: { matrix: [[0,1,1],[1,1,0],[0,0,0]], color: '#00ff66' },
  T: { matrix: [[0,1,0],[1,1,1],[0,0,0]], color: '#a000ff' },
  Z: { matrix: [[1,1,0],[0,1,1],[0,0,0]], color: '#ff0055' }
};

const PIECE_KEYS = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

class TetrisGame {
  constructor() {
    this.canvas = document.getElementById('tetris-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.nextCanvas = document.getElementById('next-canvas');
    this.nextCtx = this.nextCanvas.getContext('2d');

    this.holdCanvas = document.getElementById('hold-canvas');
    this.holdCtx = this.holdCanvas.getContext('2d');

    this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.isPaused = false;
    this.isRunning = false;

    this.currentPiece = null;
    this.nextPiece = null;
    this.holdPiece = null;
    this.canHold = true;

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;
    this.animationId = null;

    this.currentUser = null;
  }

  init() {
    this.loadUser();
    this.bindEvents();
    this.renderLeaderboard();
  }

  loadUser() {
    const saved = localStorage.getItem('tetris_neon_user');
    if (saved) {
      this.currentUser = JSON.parse(saved);
      document.getElementById('auth-modal').classList.add('hidden');
      document.getElementById('user-bar').classList.remove('hidden');
      document.getElementById('bar-username').textContent = this.currentUser.username;
      document.getElementById('bar-avatar').textContent = this.currentUser.avatar;
    } else {
      document.getElementById('auth-modal').classList.remove('hidden');
    }
  }

  registerUser(username, avatar) {
    this.currentUser = { username, avatar };
    localStorage.setItem('tetris_neon_user', JSON.stringify(this.currentUser));
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('user-bar').classList.remove('hidden');
    document.getElementById('bar-username').textContent = username;
    document.getElementById('bar-avatar').textContent = avatar;
  }

  logout() {
    localStorage.removeItem('tetris_neon_user');
    this.currentUser = null;
    this.stop();
    document.getElementById('user-bar').classList.add('hidden');
    document.getElementById('auth-modal').classList.remove('hidden');
  }

  start() {
    sfx.init();
    this.reset();
    this.isRunning = true;
    this.gameOver = false;
    this.isPaused = false;

    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
    document.getElementById('pause-overlay').classList.add('hidden');

    this.spawnPiece();
    this.lastTime = performance.now();
    this.update();
  }

  reset() {
    this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.dropInterval = 1000;
    this.holdPiece = null;
    this.canHold = true;
    this.updateStats();
    this.drawHold();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  pause() {
    if (!this.isRunning || this.gameOver) return;
    this.isPaused = !this.isPaused;
    const pauseEl = document.getElementById('pause-overlay');
    if (this.isPaused) {
      pauseEl.classList.remove('hidden');
    } else {
      pauseEl.classList.add('hidden');
      this.lastTime = performance.now();
      this.update();
    }
  }

  spawnPiece() {
    if (!this.nextPiece) {
      this.nextPiece = this.getRandomPiece();
    }
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.getRandomPiece();
    this.canHold = true;

    this.currentPiece.x = Math.floor((COLS - this.currentPiece.matrix[0].length) / 2);
    this.currentPiece.y = 0;

    this.drawNext();

    if (this.checkCollision(this.currentPiece.matrix, this.currentPiece.x, this.currentPiece.y)) {
      this.handleGameOver();
    }
  }

  getRandomPiece() {
    const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
    const shape = SHAPES[key];
    return {
      key,
      matrix: shape.matrix.map(row => [...row]),
      color: shape.color
    };
  }

  hold() {
    if (!this.canHold || !this.isRunning || this.isPaused) return;
    sfx.move();

    if (!this.holdPiece) {
      this.holdPiece = {
        key: this.currentPiece.key,
        matrix: SHAPES[this.currentPiece.key].matrix,
        color: this.currentPiece.color
      };
      this.spawnPiece();
    } else {
      const temp = {
        key: this.currentPiece.key,
        matrix: SHAPES[this.currentPiece.key].matrix,
        color: this.currentPiece.color
      };
      this.currentPiece = {
        key: this.holdPiece.key,
        matrix: SHAPES[this.holdPiece.key].matrix.map(r => [...r]),
        color: this.holdPiece.color,
        x: Math.floor((COLS - SHAPES[this.holdPiece.key].matrix[0].length) / 2),
        y: 0
      };
      this.holdPiece = temp;
    }
    this.canHold = false;
    this.drawHold();
  }

  moveLeft() {
    if (this.canMove(this.currentPiece.x - 1, this.currentPiece.y)) {
      this.currentPiece.x--;
      sfx.move();
    }
  }

  moveRight() {
    if (this.canMove(this.currentPiece.x + 1, this.currentPiece.y)) {
      this.currentPiece.x++;
      sfx.move();
    }
  }

  moveDown() {
    if (this.canMove(this.currentPiece.x, this.currentPiece.y + 1)) {
      this.currentPiece.y++;
      this.score += 1;
      this.updateStats();
      return true;
    } else {
      this.lockPiece();
      return false;
    }
  }

  hardDrop() {
    if (!this.isRunning || this.isPaused) return;
    sfx.drop();
    while (this.canMove(this.currentPiece.x, this.currentPiece.y + 1)) {
      this.currentPiece.y++;
      this.score += 2;
    }
    this.lockPiece();
    this.updateStats();
  }

  rotate() {
    if (!this.isRunning || this.isPaused) return;
    const rotated = this.rotateMatrix(this.currentPiece.matrix);
    
    if (!this.checkCollision(rotated, this.currentPiece.x, this.currentPiece.y)) {
      this.currentPiece.matrix = rotated;
      sfx.rotate();
    } else if (!this.checkCollision(rotated, this.currentPiece.x - 1, this.currentPiece.y)) {
      this.currentPiece.x -= 1;
      this.currentPiece.matrix = rotated;
      sfx.rotate();
    } else if (!this.checkCollision(rotated, this.currentPiece.x + 1, this.currentPiece.y)) {
      this.currentPiece.x += 1;
      this.currentPiece.matrix = rotated;
      sfx.rotate();
    }
  }

  rotateMatrix(matrix) {
    const N = matrix.length;
    return matrix.map((row, i) =>
      row.map((val, j) => matrix[N - 1 - j][i])
    );
  }

  canMove(nextX, nextY) {
    return !this.checkCollision(this.currentPiece.matrix, nextX, nextY);
  }

  checkCollision(matrix, offsetX, offsetY) {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          const newX = offsetX + c;
          const newY = offsetY + r;

          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && this.board[newY][newX] !== 0) return true;
        }
      }
    }
    return false;
  }

  lockPiece() {
    const { matrix, x, y, color } = this.currentPiece;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          if (y + r >= 0) {
            this.board[y + r][x + c] = color;
          }
        }
      }
    }
    this.clearLines();
    this.spawnPiece();
  }

  clearLines() {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.board[r].every(cell => cell !== 0)) {
        this.board.splice(r, 1);
        this.board.unshift(Array(COLS).fill(0));
        linesCleared++;
        r++;
      }
    }

    if (linesCleared > 0) {
      sfx.clear();
      const points = [0, 100, 300, 500, 800];
      this.score += (points[linesCleared] || 1000) * this.level;
      this.lines += linesCleared;

      this.level = Math.floor(this.lines / 10) + 1;
      this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 90);

      this.updateStats();
    }
  }

  handleGameOver() {
    this.gameOver = true;
    this.isRunning = false;
    sfx.gameover();
    document.getElementById('final-score').textContent = this.score;
    document.getElementById('gameover-overlay').classList.remove('hidden');
    this.saveScore();
  }

  saveScore() {
    if (!this.currentUser) return;
    let scores = JSON.parse(localStorage.getItem('tetris_neon_leaderboard') || '[]');
    scores.push({
      user: this.currentUser.username,
      avatar: this.currentUser.avatar,
      score: this.score,
      date: new Date().toLocaleDateString()
    });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    localStorage.setItem('tetris_neon_leaderboard', JSON.stringify(scores));
    this.renderLeaderboard();
  }

  renderLeaderboard() {
    const listEl = document.getElementById('leaderboard-list');
    const scores = JSON.parse(localStorage.getItem('tetris_neon_leaderboard') || '[]');
    if (scores.length === 0) {
      listEl.innerHTML = '<li>Nenhum recorde ainda</li>';
      return;
    }

    listEl.innerHTML = scores.map(item => `
      <li>
        <span>${item.avatar} ${item.user}</span>
        <span class="score">${item.score}</span>
      </li>
    `).join('');
  }

  updateStats() {
    document.getElementById('score-val').textContent = this.score;
    document.getElementById('level-val').textContent = this.level;
    document.getElementById('lines-val').textContent = this.lines;
  }

  drawNext() {
    this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    if (!this.nextPiece) return;
    this.drawPreview(this.nextCtx, this.nextPiece);
  }

  drawHold() {
    this.holdCtx.clearRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);
    if (!this.holdPiece) return;
    this.drawPreview(this.holdCtx, this.holdPiece);
  }

  drawPreview(ctx, piece) {
    const m = piece.matrix;
    const size = 24;
    const offsetX = (120 - m[0].length * size) / 2;
    const offsetY = (120 - m.length * size) / 2;

    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[r].length; c++) {
        if (m[r][c] !== 0) {
          ctx.fillStyle = piece.color;
          ctx.fillRect(offsetX + c * size, offsetY + r * size, size - 1, size - 1);
          ctx.shadowColor = piece.color;
          ctx.shadowBlur = 6;
        }
      }
    }
    ctx.shadowBlur = 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        this.ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }

    // Board locked blocks
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.board[r][c] !== 0) {
          this.drawBlock(this.ctx, c, r, this.board[r][c]);
        }
      }
    }

    // Current falling piece
    if (this.currentPiece) {
      // Ghost Piece
      let ghostY = this.currentPiece.y;
      while (this.canMove(this.currentPiece.x, ghostY + 1)) {
        ghostY++;
      }
      this.drawPiece(this.currentPiece.matrix, this.currentPiece.x, ghostY, this.currentPiece.color, true);

      // Main Piece
      this.drawPiece(this.currentPiece.matrix, this.currentPiece.x, this.currentPiece.y, this.currentPiece.color);
    }
  }

  drawPiece(matrix, offsetX, offsetY, color, isGhost = false) {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          this.drawBlock(this.ctx, offsetX + c, offsetY + r, color, isGhost);
        }
      }
    }
  }

  drawBlock(ctx, x, y, color, isGhost = false) {
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;

    if (isGhost) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(px + 2, py + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
      return;
    }

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(px + 2, py + 2, BLOCK_SIZE - 4, 4);

    ctx.shadowBlur = 0;
  }

  update(time = 0) {
    if (!this.isRunning || this.isPaused) return;

    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;

    if (this.dropCounter > this.dropInterval) {
      this.moveDown();
      this.dropCounter = 0;
    }

    this.draw();
    this.animationId = requestAnimationFrame((t) => this.update(t));
  }

  bindEvents() {
    document.getElementById('auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const avatar = document.querySelector('input[name="avatar"]:checked').value;
      if (username) {
        this.registerUser(username, avatar);
      }
    });

    document.getElementById('btn-logout').addEventListener('click', () => this.logout());
    document.getElementById('btn-start').addEventListener('click', () => this.start());
    document.getElementById('btn-restart').addEventListener('click', () => this.start());
    document.getElementById('btn-resume').addEventListener('click', () => this.pause());

    window.addEventListener('keydown', (e) => {
      if (!this.isRunning || this.gameOver) return;

      switch (e.key) {
        case 'ArrowLeft': this.moveLeft(); break;
        case 'ArrowRight': this.moveRight(); break;
        case 'ArrowDown': this.moveDown(); break;
        case 'ArrowUp':
        case 'x':
        case 'X': this.rotate(); break;
        case ' ': this.hardDrop(); break;
        case 'c':
        case 'C':
        case 'Shift': this.hold(); break;
        case 'p':
        case 'P': this.pause(); break;
      }
    });

    document.getElementById('touch-left').addEventListener('click', () => this.moveLeft());
    document.getElementById('touch-right').addEventListener('click', () => this.moveRight());
    document.getElementById('touch-down').addEventListener('click', () => this.moveDown());
    document.getElementById('touch-rotate').addEventListener('click', () => this.rotate());
    document.getElementById('touch-drop').addEventListener('click', () => this.hardDrop());
    document.getElementById('touch-hold').addEventListener('click', () => this.hold());
    document.getElementById('touch-pause').addEventListener('click', () => this.pause());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new TetrisGame();
  game.init();
});