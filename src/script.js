class Game {
  constructor() {
    this.gameField = document.getElementById("game-field");
    this.winText = document.getElementById("win-text");
    this.playerRed1 = new Player(10, 10, 100, 100, "image/red.png", "red");
    this.playerRed2 = new Player(110, 310, 100, 100, "image/red.png", "red");
    this.playerRed3 = new Player(310, 110, 100, 100, "image/red.png", "red");
    this.playerRed4 = new Player(410, 410, 100, 100, "image/red.png", "red");
    this.playerBlue1 = new Player(110, 110, 100, 100, "image/blue.png", "blue");
    this.playerBlue2 = new Player(10, 410, 100, 100, "image/blue.png", "blue");
    this.playerBlue3 = new Player(410, 10, 100, 100, "image/blue.png", "blue");
    this.playerBlue4 = new Player(310, 310, 100, 100, "image/blue.png", "blue");
    this.gameIsPaused = false;
    this.playerSelected = [];
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
    this.playersRed = [
      this.playerRed1,
      this.playerRed2,
      this.playerRed3,
      this.playerRed4,
    ];
    this.playersBlue = [
        this.playerBlue1,
        this.playerBlue2,
        this.playerBlue3,
        this.playerBlue4,
    ];

    this.players.forEach((player) => {
      player.addEventListener("click", (event) => {
        this.playerSelected.unshift(player);
        this.playerSelected.splice(1, 1);
        console.log("Clicked player:", player);
        console.log("player", this.playerSelected);
        console.log("red", this.playersRed);
      });
      player.allPlayers = this.players;
    });
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {

    if(this.gameIsPaused) {
        return;
    }
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }
  update() {
    if (this.playerSelected.length > 0) {
      this.playerSelected[0].move();
      this.checkWinConditionRed();
      this.checkWinConditionBlue();
    }
  }

  checkWinConditionRed() {
    // console.log(this.playersRed);
    const result = [];
    const resultV = [];

    console.log("20", result);
    console.log("30",resultV);

    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    if (result.length <= this.playersRed.length) {
      this.playersRed.forEach((player) => {
        result.push(player.top);
      });
      if(resultV.length <= this.playersRed.length) {
        this.playersRed.forEach((el) => {
            resultV.push(el.left);
        });
      }
      
      
      const isAllEqual = allEqual(result);
      const isLeftE = allEqual(resultV);


      if(isAllEqual || isLeftE) {
        this.gameIsPaused = true;
        const h1 = document.createElement("h1");
        h1.innerHTML = "RED WIN'S";
        this.winText.appendChild(h1);
      }
    }
}

    checkWinConditionBlue() {
        const res = [];
        const resV = [];

    const allEqua = (arr) => arr.every((v) => v === arr[0]);
    if (res.length <= this.playersBlue.length) {
      this.playersBlue.forEach((player) => {
        res.push(player.top);
      });
     if(resV.length <= this.playersBlue.length) {
        this.playersBlue.forEach((e) => {
            resV.push(e.left);
        });
     }

      const isAllEqua = allEqua(res);
      const isEqLeft = allEqua(resV);
      
      if(isAllEqua || isEqLeft) {
        this.gameIsPaused = true;
        const h1 = document.createElement("h1");
        h1.innerHTML = "BLUE WIN'S";
        this.winText.appendChild(h1);
      }
    }
};
  
 

  


}

class Player {
  constructor(left, top, width, height, imgSrc, allPlayers, color) {
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
    this.color = color;
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

    if (this.checkCollisions()) {
      this.left = prevLeft;
      this.top = prevTop;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  checkCollisions() {
    for (const player of this.allPlayers) {
      if (player !== this) {
        if (
          this.left < player.left + player.width &&
          this.left + this.width > player.left &&
          this.top < player.top + player.height &&
          this.top + this.height > player.top
        ) {
          console.log("detected");
          return true;
        }
      }
    }
    return false;
  }
}
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", () => {
  (startScreen.style.display = "none"),
    (gameScreen.style.display = "inline-block");
});

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

      const player = game.playerSelected[0];
      const prevLeft = player.left;
      const prevTop = player.top;

      let newX = player.left;
      let newY = player.top;

      switch (key) {
        case "ArrowLeft":
          newX -= 100;

          break;
        case "ArrowUp":
          newY -= 100;

          break;
        case "ArrowRight":
          newX += 100;

          break;
        case "ArrowDown":
          newY += 100;

          break;
      }

      // Check if the new position is within the game boundaries
      const minLeft = 10;
      const minTop = 10;
      const maxLeft = game.gameField.offsetWidth - player.width - 10;
      const maxTop = game.gameField.offsetHeight - player.height - 10;

      if (newX < minLeft) {
        newX = minLeft;
      }

      if (newY < minTop) {
        newY = minTop;
      }

      if (newX > maxLeft) {
        newX = maxLeft;
      }

      if (newY > maxTop) {
        newY = maxTop;
      }

      // Update the player's position
      player.left = newX;
      player.top = newY;

      if (player.checkCollisions()) {
        player.left = prevLeft;
        player.top = prevTop;
      }

      player.updatePosition();
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
