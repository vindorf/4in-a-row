/*
const cell1 = document.getElementById('1'); 
const player1 = 'image/red-1217969_640.png';
const img1 = document.createElement('img');
img1.width = 80;
img1.height = 80;
img1.directionX = 0;
img1.directionY = 0;
img1.left = 0;
img1.top = 0; 
img1.src = player1;
cell1.appendChild(img1);
*/

class Game {
    constructor() {
        this.gameField = document.getElementById("game-field");
        this.playerRed1 = new Player(
            165,
            155,
            80,
            80,
            'image/red-1217969_640.png',
            1
        );
        this.playerRed2 = new Player(
            565,
            555,
            80,
            80,
            'image/red-1217969_640.png',
            5
        );
        this.playerRed3 = new Player(
            265,
            455,
            80,
            80,
            'image/red-1217969_640.png',
            17
        );
        this.playerRed4 = new Player(
            465,
            255,
            80,
            80,
            'image/red-1217969_640.png',
            8
        );;
        this.playerBlue1 = new Player (
            265,
            255,
            80,
            80,
            'image/yellow-1217980_640.png',
            21
        );
        this.playerBlue2 =new Player (
            165,
            555,
            80,
            80,
            'image/yellow-1217980_640.png',
            7
        );;
        this.playerBlue3 =new Player (
            565,
            155,
            80,
            80,
            'image/yellow-1217980_640.png',
            5
        );;
        this.playerBlue4 =new Player (
            465,
            455,
            80,
            80,
            'image/yellow-1217980_640.png',
            19
        );;
    }
}
/*
class Player {
    constructor(playerImageSrc, width, height) {
      this.image = new Image();
      this.image.src = playerImageSrc;
      this.image.width = width;
      this.image.height = height;
      this.image.directionX = 0;
      this.image.directionY = 0;
      this.image.left = 0;
      this.image.top = 0;
    } 
}
*/

class Player {
    constructor(left, top, width, height, imgSrc, cellNr) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.cellNr = cellNr; 
        this.cell = document.getElementById(`${this.cellNr}`);
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = 'absolute';
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.cell.appendChild(this.element);
    }
}
window.onload = function () {
    const game = new Game();
    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", () => location.reload());


    function handleKeydown(event) {
        const key = event.key;
        const possibleKeystrokes = [
          "ArrowLeft",
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
        ];
    
        
        if (possibleKeystrokes.includes(key)) {
          event.preventDefault();
    
          
          switch (key) {
            case "ArrowLeft":
              game.playerRed1.directionX = -4;
              break;
            case "ArrowUp":
              game.playerRed1.directionY = -4;
              break;
            case "ArrowRight":
              game.playerRed1.directionX = 4;
              break;
            case "ArrowDown":
              game.playerRed1.directionY = 4;
              break;
          }
        }
      }

      function handleKeyup(event) {
        const key = event.key;
        const possibleKeystrokes = [
          "ArrowLeft",
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
        ];
    
        
        if (possibleKeystrokes.includes(key)) {
          event.preventDefault();
    
          
          switch (key) {
            case "ArrowLeft":
              game.playerRed1.directionX = 0;
              break;
            case "ArrowUp":
              game.playerRed1.directionY = 0;
              break;
            case "ArrowRight":
              game.playerRed1.directionX = 0;
              break;
            case "ArrowDown":
              game.playerRed1.directionY = 0;
              break;
          }
        }
      }

      window.addEventListener("keyup", handleKeyup);
      window.addEventListener("keydown", handleKeydown);
}