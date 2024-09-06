const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetGame = document.getElementById('resetGame');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Tie';
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    
    if (board[cellIndex] || !gameActive) return;
    
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    const winner = checkWinner();
    
    if (winner) {
        gameStatus.textContent = winner === 'Tie' ? "It's a Tie!!!" : `Player ${winner} Wins!!!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameStatus.textContent = `Player X's turn`;
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetGame.addEventListener('click', resetGameBoard);
