let obs = ["moss", "wood", "spike"];
ran3 = rand(obs);
const obs_top = new Image();
obs_top.src = `obstacles/${obs[ran3]}/top.png`;
const obs_bottom = new Image();
obs_bottom.src = `obstacles/${obs[ran3]}/bottom.png`;

let obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 30;
    this.bottom = (Math.random() * canvas.height) / 3 + 30;
    this.x = canvas.width;

    this.width = 60;

    this.counted = false;
    // this.frameX = 0;
  }
  draw() {
    ctx.fillStyle = this.color;

    ctx.drawImage(obs_top, this.x, 0, this.width, this.top);
    ctx.drawImage(
      obs_bottom,
      this.x,
      canvas.height - this.bottom,
      this.width,
      this.bottom
    );
  }
  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
      point.play();
    }
    this.draw();
  }
}

function randomizer() {
  Math.trunc(Math.random() * 4);
}

let obstacleRange = 150;
function handleObstacles() {
  //distance obstacle
  if (frame % obstacleRange === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
