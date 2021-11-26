/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
//  const WIDTH = 7;
//  const HEIGHT = 6;
 
//  let currPlayer = 1; // active player: 1 or 2
//  let board = []; // array of rows, each row is array of cells  (board[y][x])



// const player1 = new Player(document.getElementById("player1-input").input);
// console.log(player1);

class Game {
  constructor(color1 = red, color2 = blue, width = 7, height = 6) {
    this.player1 = color1;
    this.player2 = color2;
    this.currPlayer = this.player1;
    this.width = width;
    this.height = height;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    this.board = [];
    for(let i = 0; i < this.height; i++) {
      this.board.push(Array.from({length : this.width}));
    }
  }

  makeHtmlBoard() {
      const htmlBoard = document.getElementById('board');
      const top = document.createElement("tr");
      top.setAttribute("id", "column-top");
      this.handleGameClick = this.handleClick.bind(this);
      top.addEventListener("click", this.handleGameClick);
      
      for (let x = 0; x < this.width; x++) {
         const headCell = document.createElement("td");
         headCell.setAttribute("id", x);
         top.append(headCell);
       }
      htmlBoard.append(top);

      for (let y = 0; y < this.height; y++) {
        const row = document.createElement('tr');
      
        for (let x = 0; x < this.width; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
        htmlBoard.append(row);
      }
  }

  findSpotForCol(x) {
      for(let y = this.height - 1; y >= 0; y --) {
           if(!this.board[y][x]) {
             return y;
           }
        }
         return null;
  }

    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('played-piece');
      // piece.classList.add(`this.currPlayer`);
      console.log('currplayer', this.currPlayer.color);
      piece.style.backgroundColor = this.currPlayer.color;
      const square = document.getElementById(`${y}-${x}`);
      square.append(piece);
      console.log('piece from placeInTable', piece);
      setTimeout(() => piece.classList.add('piece'), 100)
    }

    endGame(msg) {
      alert(msg);
      location.reload();
  }

  handleClick(evt) {
 
    // get x from ID of clicked cell
    let x = parseInt(evt.target.id);
  
  
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    this.board[y][x] = this.currPlayer;
  
  
    this.placeInTable(y, x);
  
    // check for win
  
    // get DOM elements for event listeners for win
    let cell = document.getElementById(`${y}-${x}`);
    let evtTarget = document.getElementById("column-top");
  
    if (this.checkForWin()) {
      let winner = this.currPlayer.color;
      evtTarget.removeEventListener('click', this.handleGameClick);
      cell.addEventListener('animationend', () => {
        return this.endGame(`The ${winner} player won!`)});
    }
  
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('It`s a tie!');
    }
  

    this.currPlayer = 
    this.currPlayer === this.player1 ? this.player2 : this.player1;
  
  }

  checkForWin() {
    // make sure win is on board
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    }

    // define four legal wins- horizontal, vertical, two diagonals- and check if any are true
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        //
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}
class Player {
  constructor(color) {
    this.color = color;
  }
}

const form = document.getElementById('start-game');
form.addEventListener('click', (evt) => {
  evt.preventDefault();
  if(evt.target.tagName === 'BUTTON') {
    let player1;
    let player2;
    if(!document.getElementById('player1-input').value) {
      player1 = new Player('red');
    }
    else {
      player1 = new Player(document.getElementById('player1-input').value);
    }
    
    if(!document.getElementById('player2-input').value) {
      player2 = new Player('blue');
    }
    else {
      player2 = new Player(document.getElementById('player2-input').value);
    }
    // player1 = new Player(document.getElementById('player1-input').value);
    // player2 = new Player(document.getElementById('player2-input').value);
    console.log('players', player1, player2);

    new Game(player1, player2);
  }
})

