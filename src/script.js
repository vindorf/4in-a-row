class Game {
  constructor() {
    this.gameField = document.getElementById("game-field");

    this.playerRed1 = new Player(20, 25, 80, 80, "image/red-1217969_640.png");
    this.playerRed2 = new Player(120, 320, 80, 80, "image/red-1217969_640.png");
    this.playerRed3 = new Player(320, 125, 80, 80, "image/red-1217969_640.png");
    this.playerRed4 = new Player(420, 425, 80, 80, "image/red-1217969_640.png");
    this.playerBlue1 = new Player(
      120,
      125,
      80,
      80,
      "image/yellow-1217980_640.png"
    );
    this.playerBlue2 = new Player(
      20,
      425,
      80,
      80,
      "image/yellow-1217980_640.png"
    );
    this.playerBlue3 = new Player(
      420,
      20,
      80,
      80,
      "image/yellow-1217980_640.png"
    );
    this.playerBlue4 = new Player(
      320,
      325,
      80,
      80,
      "image/yellow-1217980_640.png"
    );
    this.playerSelected= [];
    this.players = [
      this.playerBlue1,
      this.playerBlue2,
      this.playerBlue3,
      this.playerBlue4,
      this.playerRed1,
      this.playerRed2,
      this.playerRed3,
      this.playerRed4,
    ];
  
    this.players.forEach(player => {
        player.addEventListener('click', (event) => {
          this.playerSelected.unshift(player);
          this.playerSelected.splice(1, 1);
          console.log('Clicked player:', player);
          console.log(this.playerSelected);
        });
        player.allPlayers = this.players;
      });
    
       
  }


  

  start() {
    this.gameLoop();
  }

  gameLoop() {
    // console.log("game lopp");
    this.update();
    //this.checkOccupiedGridItems();
    window.requestAnimationFrame(() => this.gameLoop());
  }
  update() {
    if (this.playerSelected.length > 0) {
        this.playerSelected[0].move();
    }
}
checkOccupiedGridItems() {
    for (const player of this.players) {
      if (player.checkCollisions()) {
        console.log(`Grid item occupied by player at (${player.left}, ${player.top})`);
      }
    }
  }


}

class Player {
  constructor(left, top, width, height, imgSrc, allPlayers) {
    this.gameField = document.getElementById("game-field");
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameField.appendChild(this.element);
    this.allPlayers = allPlayers;
  }
  addEventListener(eventType, callback) {
    this.element.addEventListener(eventType, callback);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;
    this.updatePosition();

    const minLeft = 10;
    const minTop = 10;
    const maxLeft = this.gameField.offsetWidth - this.width - 10;
    const maxTop = this.gameField.offsetHeight - this.height - 10;

    if (this.left < minLeft) {
      this.left = minLeft;
    }

    if (this.top < minTop) {
      this.top = minTop;
    }

    if (this.left > maxLeft) {
      this.left = maxLeft;
    }

    if (this.top > maxTop) {
      this.top = maxTop;
    }

    this.updatePosition();
    this.checkCollisions();
  }
  updatePosition() {
    // console.log("update Pos");
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  checkCollisions() {
    for (const player of this.allPlayers) {
      if (player !== this) {
        // Check if the current player collides with another player
        if (
          this.left < player.left + player.width &&
          this.left + this.width > player.left &&
          this.top < player.top + player.height &&
          this.top + this.height > player.top
        ) {
          // Collision detected, stop the player's movement
          console.log("detected");
          //return true;
          this.directionX = 0;
          this.directionY = 0;
          //this.players.pop();

        }
      }
    }
    return false;
  }

}
window.onload = function () {
  const game = new Game();
  const refreshBtn = document.getElementById("refresh-btn");
  refreshBtn.addEventListener("click", () => location.reload());
  game.start();

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
          

          game.playerSelected[0].directionX = -1;
          if (game.playerSelected[0].directionY !== 0) {
            game.playerSelected[0].directionY = 0;
          }
          break;
        case "ArrowUp":
          
          game.playerSelected[0].directionY = -1;
          if (game.playerSelected[0].directionX !== 0) {
            game.playerSelected[0].directionX = 0;
          }
          break;
        case "ArrowRight":
          
          game.playerSelected[0].directionX = 1;
          if (game.playerSelected[0].directionY !== 0) {
            game.playerSelected[0].directionY = 0;
          }
          break;
        case "ArrowDown":
          
          game.playerSelected[0].directionY = 1;
          if (game.playerSelected[0].directionX !== 0) {
            game.playerSelected[0].directionX = 0;
          }
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
          game.playerSelected[0].directionX = 0;
          break;
        case "ArrowUp":
          game.playerSelected[0].directionY = 0;
          break;
        case "ArrowRight":
          game.playerSelected[0].directionX = 0;
          break;
        case "ArrowDown":
          game.playerSelected[0].directionY = 0;
          break;
      }
    }
  }
  

  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
};
