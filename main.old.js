// Jonas Karg 03.05.2018
// This is my attempt at building a somewhat
// flexible physics engine using basic math.

const g = new p5.Vector(0, 9.81);
let particles = [];

function setup() {
  const cnv = createCanvas(window.innerWidth, window.innerHeight);
  noFill();

  for (let i = 0; i < 5; i++) {
    particles[i] = new Particle(
      createVector(random(10, width - 10), random(10, height - 10)),
      random(1, 4)
    );
  }
}

function draw() {
  // background(255);

  particles.map(particle => {
    if (mouseIsPressed) {
      particle.applyForce(createVector(mouseX, mouseY).sub(particle.pos).div(6000));
      stroke(0, 0, 0, 50);
      line(mouseX, mouseY, particle.pos.x, particle.pos.y);

      particle.applyForce(g);
      particle.update();
      particle.show();
    }
  });
}

window.addEventListener("resize", () => resizeCanvas(window.innerWidth, window.innerHeight));