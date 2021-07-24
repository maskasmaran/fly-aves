let birds = [
  "chick",
  "fluf",
  "green",
  "grey",
  "monster",
  "yellow_hat",
  "grumpy",
];

const flap = new Audio();
flap.src = "sounds/flap.wav";

const point = new Audio();
point.src = "sounds/point.wav";

const hit = new Audio();
hit.src = "sounds/hit.wav";

function rand(el) {
  return Math.trunc(Math.random() * el.length);
}
let ran = rand(birds);
const yellowSprite = new Image();
yellowSprite.src = `birds/${birds[ran]}.png`;

let curve;

class Bird {
  constructor() {
    this.x = 300;
    this.y = 200;
    this.vy = 0;
    this.originalWidth = 750;
    this.originalHeight = 600;
    this.width = this.originalWidth / 20;
    this.height = this.originalHeight / 20;
    //gravity
    this.weight = 0.3;
    this.frameX = 0;
  }
  update() {
    curve = Math.sin(angle) * 27;
    if (this.y > canvas.height - this.height * 2 + curve) {
      this.y = canvas.height - this.height * 2 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (
      (spacePressed && this.y > this.height * 3) ||
      (click && this.y > this.height * 3) ||
      (touch && this.y > this.height * 3)
    ) {
      this.flap();
    }
  }
  draw() {
    ctx.drawImage(
      yellowSprite,
      this.frameX * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x - 10,
      this.y - 12,
      this.width * 1.2,
      this.height * 1.2
    );
  }
  flap() {
    flap.play();
    //flap velocity
    this.vy -= 1.53;
    //wing move
    if (this.frameX >= 3) this.frameX = 0;
    else if (frame % 3 === 0) this.frameX++;
  }
}

const bird = new Bird();
