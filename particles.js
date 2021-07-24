let particlesArray = [];
let hue = 0;

colors = ["#FC1414", "#FC5ECC", "#09C225", "#C2B390", "#60F71E", "#FFF80F"];
//
class Particle {
  constructor() {
    this.x = bird.x;
    this.y = bird.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    if (ran === 6) {
      this.color = `hsla(${hue},100%,50%,0.8)`;
    } else this.color = colors[ran];
  }
  update() {
    this.x -= gameSpeed;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particlesArray.unshift(new Particle());
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  if (particlesArray.length > 300) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}
