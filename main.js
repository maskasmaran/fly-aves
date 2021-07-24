const canvas = document.getElementById("canvas1");
// ctx allows built in canvas method
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
// let click = false;
let click = false;
let touch = false;
let angle = 0;
let again = false;
let frame = 0;
let score = 0;
let gameSpeed = 1.5;
let start = false;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#FFF200");
gradient.addColorStop("0.5", "#FFF200");
gradient.addColorStop("0.55", "#FFF200");
gradient.addColorStop("0.6", "#FFF200");
gradient.addColorStop("0.9", "#FFF200");

let x = 0;

let backs = [
  "forest",
  "industry",
  "mountain",
  "fence",
  "fence-noon",
  "beach",
  "mist",
  "mist_2",
  "desert",
  "trees",
  "pyramid",
  "space",
  "ghost",
  "hill",
  "fuji",
];
let ran2 = rand(backs);

const backgroundLayer1 = new Image();
backgroundLayer1.src = `backgrounds/${backs[ran2]}/1.png`;
const backgroundLayer2 = new Image();
backgroundLayer2.src = `backgrounds/${backs[ran2]}/2.png`;
const backgroundLayer3 = new Image();
backgroundLayer3.src = `backgrounds/${backs[ran2]}/3.png`;
const backgroundLayer4 = new Image();
backgroundLayer4.src = `backgrounds/${backs[ran2]}/4.png`;

const displayScore = function (content) {
  document.querySelector(".score").textContent = content;
};
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 600;
    this.height = 400;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = this.x - this.speed;
    this.x2 = this.x2 - this.speed;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundLayer1, 0.1);
const layer2 = new Layer(backgroundLayer2, 0.3);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.8);

const gameObjects = [layer1, layer2, layer3, layer4];

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

// function sleep(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }

function animate() {
  if (!handleCollisions()) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });

    bird.draw();

    ctx.fillStyle = gradient;
    if (!start) {
      gameSpeed = 0;
      particlesArray = [];
      bird.weight = 0;
    } else {
      gameSpeed = 1.5;
      bird.weight = 0.3;
      handleObstacles();
      handleParticles();
      bird.update();
    }

    ctx.font = "70px Monaco";
    ctx.strokeText(score, 510, 90);
    ctx.fillText(score, 510, 90);

    requestAnimationFrame(animate);
    angle += 0.13;
    hue++;
    frame++;
    if (score > 7 && score <= 11) {
      obstacleRange = 100;
    } else if (score > 11 && score <= 16) {
      obstacleRange = 88;
    } else if (score > 16 && score <= 18) {
      obstacleRange = 120;
    } else if (score > 20 && score <= 22) {
      obstacleRange > 60;
    } else if (score > 25 && score <= 30) {
      obstacleRange = 100;
    } else if (score > 30 && score <= 33) {
      obstacleRange = 70;
    } else if (score > 50) {
      obstacleRange = 80;
    } else if (score > 55 && score <= 62) {
      obstacleRange = 50;
    }
  } else {
    gameSpeed = 0;
  }
}

document.querySelector(".start").addEventListener("click", function () {
  document.querySelector(".start").classList.add("hidden");
  start = true;
});

animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

window.addEventListener("mousedown", function () {
  click = true;
});
window.addEventListener("mouseup", function () {
  click = false;
  bird.frameX = 0;
});

window.addEventListener("touchstart", function () {
  touch = true;
});
window.addEventListener("touchend", function () {
  touch = false;
  bird.frameX = 0;
});

const boom = new Image();
boom.src = "effects/boom.png";
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(boom, bird.x, bird.y, 50, 50);
      hit.play();
      document.querySelector(".over").classList.remove("hidden");
      document.querySelector(".again").classList.remove("hidden");

      return true;
    }
  }
}

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".over").classList.add("hidden");
  document.querySelector(".again").classList.add("hidden");
  gameSpeed = 1.5;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
  handleObstacles();
  handleParticles();
  bird.draw();
  bird.x = 300;
  bird.y = 200;
  score = 0;
  obstaclesArray = [];
  particlesArray = [];
  bird.update();
  ctx.fillStyle = gradient;
  ctx.font = "90px Monaco";
  ctx.strokeText(score, 500, 70);
  ctx.fillText(score, 500, 70);
  requestAnimationFrame(animate);
  angle += 0.13;
  hue++;
  frame++;
  if (score > 7 && score <= 11) {
    obstacleRange = 100;
  } else if (score > 11 && score <= 16) {
    obstacleRange = 88;
  } else if (score > 16 && score <= 18) {
    obstacleRange = 120;
  } else if (score > 20 && score <= 22) {
    obstacleRange > 60;
  } else if (score > 25 && score <= 30) {
    obstacleRange = 100;
  } else if (score > 30 && score <= 33) {
    obstacleRange = 70;
  } else if (score > 50) {
    obstacleRange = 80;
  } else if (score > 55 && score <= 62) {
    obstacleRange = 50;
  }
});
