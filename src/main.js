let isPlaying = true;
const game = gameController();

while (isPlaying) {
  
  const row = parseInt(prompt('Enter row (0-2): '));
  const column = parseInt(prompt('Enter column (0-2): '));
  
  game.playRound(row, column);

  game.checkWinner();
}

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
  }

  return {
    getBoard,
    playTurn,
    printBoard: () => {
      console.log('\nCurrent Board:');
      for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(' | '));
      }
      console.log(); // Empty line for spacing
    }
  };
}

function gameController (
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
    
  ]

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (column, row) => {
    if (board.playTurn(row, column, getActivePlayer().token)) {
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("Invalid move, try again!");
    }
  };

  const checkWinner = (column, row) => {
    if (board(row, column)) {
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("Invalid move, try again!");
    }
  }

    printNewRound();

    return {
      playRound,
      getActivePlayer
    };
}