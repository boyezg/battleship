class Battleship {
    constructor() {
        this.gridSize = 10;
        this.player1 = this.createPlayer();
        this.player2 = this.createPlayer();
        this.currentPlayer = 1;
        this.messageEl = document.getElementById("message");
        this.init();
    }

    init() {
        this.renderBoards();
        this.placeShips(this.player1);
        this.placeShips(this.player2);
        this.addEventListeners();
    }

    createPlayer() {
        return {
            grid: Array.from({ length: this.gridSize }, () =>
                Array(this.gridSize).fill(null)
            ),
            ships: [],
            hits: 0,
        };
    }

    renderBoards() {
        const player1Board = document.getElementById("player1-board");
        const player2Board = document.getElementById("player2-board");

        [player1Board, player2Board].forEach((board, index) => {
            board.innerHTML = "";
            const isOpponent = index === 1;

            const rowLabels = document.createElement("div");
            rowLabels.classList.add("grid-labels", "row-labels");

            for (let x = 0; x < this.gridSize; x++) {
                const label = document.createElement("div");
                label.classList.add("label");
                label.textContent = x + 1;
                rowLabels.appendChild(label);
            }

            const colLabels = document.createElement("div");
            colLabels.classList.add("grid-labels", "column-labels");

            for (let y = 0; y < this.gridSize; y++) {
                const label = document.createElement("div");
                label.classList.add("label");
                label.textContent = y + 1;
                colLabels.appendChild(label);
            }

            board.parentElement.appendChild(rowLabels);
            board.parentElement.appendChild(colLabels);

            for (let x = 0; x < this.gridSize; x++) {
                for (let y = 0; y < this.gridSize; y++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.dataset.x = x;
                    cell.dataset.y = y;

                    if (!isOpponent && this.player1.grid[x][y] === "S") {
                        cell.classList.add("ship");
                    }

                    board.appendChild(cell);
                }
            }
        });
    }

    placeShips(player) {
        this.placeShip(player, 0, 0, 4, true);
        this.placeShip(player, 5, 5, 3, false);
    }

    placeShip(player, startX, startY, length, isHorizontal) {
        for (let i = 0; i < length; i++) {
            const x = isHorizontal ? startX : startX + i;
            const y = isHorizontal ? startY + i : startY;
            player.grid[x][y] = "S";
        }
    }

    addEventListeners() {
        document.getElementById("player2-board").addEventListener("click", (e) => {
            if (this.currentPlayer !== 1) return;
            this.handleAttack(e, this.player2, "Player 2");
        });

        document.getElementById("player1-board").addEventListener("click", (e) => {
            if (this.currentPlayer !== 2) return;
            this.handleAttack(e, this.player1, "Player 1");
        });

        document.getElementById("restart-btn").addEventListener("click", () => {
            location.reload();
        });
    }

    handleAttack(e, opponent, opponentName) {
        const cell = e.target;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        if (!cell.classList.contains("cell") || cell.classList.contains("hit") || cell.classList.contains("miss")) {
            return;
        }

        if (opponent.grid[x][y] === "S") {
            cell.classList.add("hit");
            opponent.grid[x][y] = "H";
            opponent.hits++;
            this.messageEl.textContent = `Hit! ${opponentName}'s ship is damaged.`;
        } else {
            cell.classList.add("miss");
            opponent.grid[x][y] = "M";
            this.messageEl.textContent = `Miss! ${opponentName}'s turn.`;
        }

        const totalShipCells = 7;

        if (opponent.hits === totalShipCells) {
            this.messageEl.textContent = `Player ${this.currentPlayer} wins!`;
            return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.messageEl.textContent = `Player ${this.currentPlayer}'s Turn`;
    }
}

new Battleship();
