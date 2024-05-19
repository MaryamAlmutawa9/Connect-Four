
const circles = document.querySelectorAll(".col")
const rows = document.querySelectorAll(".row")
let isPlayer1Turn = true
let gameWon = false;

const creatplayes = () => {
circles.forEach ( col => {
  const player1 = document.createElement('div')
  const player2 = document.createElement('div')
  player1.className = 'player1'
  player2.className = 'player2'

  col.appendChild(player1)
  col.appendChild(player2)
})
}
creatplayes()

const checkWinner = (cols, index, rowIndex) => {
  const currentPlayer = isPlayer1Turn ? 'player1' : 'player2';

  // Horizontal check
  let consecutiveCount = 1; // Start with 1 because we already have the current piece

  // Check to the right
  for (let i = index + 1; i < index + 4 && i < cols.length; i++) {
    const player = cols[i].querySelector(`.${currentPlayer}`);
    if (player.style.display === "block") {
      consecutiveCount++;
    } else {
      break;
    }
  }

  // Check to the left
  for (let i = index - 1; i > index - 4 && i >= 0; i--) {
    const player = cols[i].querySelector(`.${currentPlayer}`);
    if (player.style.display === "block") {
      consecutiveCount++;
    } else {
      break;
    }
  }

  if (consecutiveCount >= 4) return true;

   // Vertical check
   consecutiveCount = 1; // Start with 1 for the current piece
   for (let r = rowIndex + 1; r < rowIndex + 4 && r < rows.length; r++) {
     const col = rows[r].querySelectorAll(".col")[index];
     const player = col.querySelector(`.${currentPlayer}`);
     if (player.style.display === "block") {
       consecutiveCount++;
     } else {
       break;
     }
   }
 
   if (consecutiveCount >= 4) return true;

  // Diagonal checks
  const checkDiagonal = (r, c, dr, dc) => {
    count = 0;
    while (r >= 0 && r < rows.length && c >= 0 && c < cols.length) {
      const col = rows[r].querySelectorAll(".col")[c];
      const player = col.querySelector(`.${currentPlayer}`);
      if (player.style.display === "block") {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
      r += dr;
      c += dc;
    }
    return false;
  };

  // Check diagonals from the current position
  if (checkDiagonal(rowIndex, index, 1, 1) || checkDiagonal(rowIndex, index, 1, -1) || checkDiagonal(rowIndex, index, -1, 1) || checkDiagonal(rowIndex, index, -1, -1)) {
    return true;
  }

  return false;
};

const updateplayer = () => {
rows.forEach(( row, rowIndex) => { 
  const cols = row.querySelectorAll(".col");
  cols.forEach((col, index) => {
  col.addEventListener("click", () => {
    if (gameWon) return;
    if (isColSelect(cols, index)) {
    const player1 = col.querySelector(".player1")
    const player2 = col.querySelector(".player2")

      
      if (player1.style.display === "block" || player2.style.display === "block") {
        return 
      }

    if (isPlayer1Turn) {
      player1.style.display = "block"
      player2.style.display = "none"
    } else {
      player1.style.display = "none"
      player2.style.display = "block"
    }

    if (checkWinner(cols, index, rowIndex)) {
      gameWon = true; 
      return;
    }
    
    isPlayer1Turn = !isPlayer1Turn
  }
  });
  });
  });
}

function isColSelect(cols, index) {
  // Last column can always be selected
  if (index === cols.length - 1) {
    return true
  }

  const nextCol = cols[index + 1]
  const nextPlayer1 = nextCol.querySelector(".player1")
  const nextPlayer2 = nextCol.querySelector(".player2")

  return (nextPlayer1.style.display === "block" || nextPlayer2.style.display === "block")
}
updateplayer()



