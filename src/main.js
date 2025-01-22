const game = (function () {
  let isPlaying = true;

  function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = "-";
      }
    }

    const getBoard = () => board;

    const playTurn = (row, column, playerToken) => {
      if (row >= 0 && row < 3 && column >= 0 && column < 3) {
        if (board[row][column] === "-") {
          board[row][column] = playerToken;
          return true;
        }
      }
      return false;
    };

    return {
      getBoard,
      playTurn,
      printBoard: () => {
        console.log('\nCurrent Board:');
        for (let i = 0; i < board.length; i++) {
          console.log(board[i].join(' | '));
        }
        console.log();
      }
    };
  }

  function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = gameBoard();

    const players = [
      {
        name: playerOneName,
        token: "X"
      },
      {
        name: playerTwoName,
        token: "O"
      }
    ];

    const winConditions = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
      if (board.playTurn(row, column, getActivePlayer().token)) {
        if (checkWinner()) {
          board.printBoard();
          console.log(`${getActivePlayer().name} wins!`);
          alert(`${getActivePlayer().name} wins!`);
          isPlaying = false;
        } else if (isBoardFull()) {
          board.printBoard();
          console.log("It's a draw!");
          alert("It's a draw!");
          isPlaying = false;
        } else {
          switchPlayerTurn();
          printNewRound();
        }
      } else {
        alert("Invalid move, try again!");
      }
    };

    const checkWinner = () => {
      const currentBoard = board.getBoard();
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        const [rowA, colA] = a;
        const [rowB, colB] = b;
        const [rowC, colC] = c;
        if (
          currentBoard[rowA][colA] !== "-" &&
          currentBoard[rowA][colA] === currentBoard[rowB][colB] &&
          currentBoard[rowA][colA] === currentBoard[rowC][colC]
        ) {
          return true;
        }
      }
      return false;
    };

    const isBoardFull = () => {
      const currentBoard = board.getBoard();
      for (let row of currentBoard) {
        if (row.includes("-")) {
          return false;
        }
      }
      return true;
    };

    printNewRound();

    return {
      playRound,
      getActivePlayer,
      checkWinner
    };
  }

  function playGame() {
    if (!isPlaying) return;

    const row = parseInt(prompt('Enter row (0-2): '));
    const column = parseInt(prompt('Enter column (0-2): '));

    if (isNaN(row) || isNaN(column) || row < 0 || row > 2 || column < 0 || column > 2) {
      alert("Invalid input! Please enter numbers between 0 and 2.");
      playGame(); // Ask for input again
      return;
    }

    gameControllerInstance.playRound(row, column);

    if (isPlaying) {
      playGame(); // Continue the game
    }
  }

  const gameControllerInstance = gameController();

  // Expose only the necessary functions to the global scope
  return {
    start: playGame
  };
})();

game.start();