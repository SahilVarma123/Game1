const board = document.getElementById("board");
const player = document.getElementById("player");
const diceText = document.getElementById("dice");

const ladders = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  17: 4
};

const snakes = {
  27: 1,
  21: 9,
  19: 7,
  23: 15
};

let playerPosition = 1;

// Create the board
for (let i = 100; i > 0; i--) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.textContent = i;
  board.appendChild(cell);
}

// Convert board position to x, y grid position
function getCoordinates(position) {
  const row = Math.floor((position - 1) / 10);
  const col = (position - 1) % 10;
  const x = (row % 2 === 0) ? col * 50 : (9 - col) * 50;
  const y = (9 - row) * 50;
  return { x, y };
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceText.textContent = `You rolled a ${dice}`;

  let nextPosition = playerPosition + dice;
  if (nextPosition > 100) return;

  // Check for ladder or snake
  if (ladders[nextPosition]) {
    nextPosition = ladders[nextPosition];
    diceText.textContent += ` 🎉 Ladder to ${nextPosition}`;
  } else if (snakes[nextPosition]) {
    nextPosition = snakes[nextPosition];
    diceText.textContent += ` 🐍 Snake to ${nextPosition}`;
  }

  playerPosition = nextPosition;

  // Update player position visually
  const { x, y } = getCoordinates(playerPosition);
  player.style.left = x + 5 + "px";
  player.style.top = y + 5 + "px";

  if (playerPosition === 100) {
    alert("🎉 Congratulations! You win!");
  }
}
