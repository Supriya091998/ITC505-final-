document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const gridSize = 5;
    const cells = [];
    let playerName = "";

    // Prompt the user to enter their name at the start
    function askPlayerName() {
        playerName = prompt("Welcome to Lights Out! Please enter your name:");
        if (!playerName) {
            playerName = "Player"; // Default name if none is entered
        }
        alert(`Hi ${playerName}, let's play Lights Out!`);
    }

    askPlayerName();

    // Create the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => toggleCell(i));
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Function to toggle a cell and its neighbors
    function toggleCell(index) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        toggle(row, col);
        toggle(row - 1, col); // Top
        toggle(row + 1, col); // Bottom
        toggle(row, col - 1); // Left
        toggle(row, col + 1); // Right

        if (checkWin()) {
            setTimeout(() => {
                alert(`${playerName}, you did awesome today!`);
                randomizeBoard();
            }, 100);
        }
    }

    // Helper function to toggle a single cell
    function toggle(row, col) {
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
            const index = row * gridSize + col;
            cells[index].classList.toggle("is-off");
        }
    }

    // Function to randomize the board
    function randomizeBoard() {
        cells.forEach(cell => cell.classList.remove("is-off"));
        for (let i = 0; i < 20; i++) {
            const randomIndex = Math.floor(Math.random() * cells.length);
            toggleCell(randomIndex);
        }
    }

    // Function to check if the game is won
    function checkWin() {
        return cells.every(cell => !cell.classList.contains("is-off"));
    }

    // Initialize the board with a random configuration
    randomizeBoard();
});
