// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the selected cell is empty
    if (cells[index] === '') {
        // Set the current player's symbol in the cell
        cells[index] = currentPlayer;
        element.textContent = currentPlayer; // Display "X" or "O"

        // Check for a win
        if (checkWin()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            disableButtons();
        } else if (checkDraw()) {
            // Check for a draw
            result.textContent = "It's a draw!";
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Current player's turn: ${currentPlayer}`;
        }

        // Disable the button after a move
        element.disabled = true;
    }
};

// Function to check for a win
const checkWin = () => {
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
};

// Function to check for a draw
const checkDraw = () => {
    return cells.every((cell) => cell !== '');
};

// Function to disable buttons after a win
const disableButtons = () => {
    btns.forEach((btn) => {
        btn.disabled = true;
    });
};

// Function to reset the game
const resetGame = () => {
    // Clear the game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = "Current player's turn: X";

    // Reset cell content and enable buttons
    btns.forEach((btn, index) => {
        btn.textContent = ''; // Clear the cell content
        btn.disabled = false; // Enable the button
        btn.addEventListener('click', () => ticTacToe(btn, index)); // Add click event listener
    });
};

// Add click event listener to reset button
document.querySelector('#reset-button').addEventListener('click', resetGame);
// Add click event listeners to buttons
btns.forEach((btn, index) => {
    btn.addEventListener('click', () => ticTacToe(btn, index));
});

// Add click event listener to reset button
document.querySelector('#reset-button').addEventListener('click', resetGame);

// Initialize the game
result.textContent = "Current player's turn: X";
