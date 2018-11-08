// Jonas Karg 03.05.2018
// This is my attempt at building a somewhat
// flexible physics engine using basic math.

let particles = [];
let maxLength;
let ui;
let amount = 100;

function setup() {
  if (!ui) {
    ui = {
      reset: createButton("Reset"),
      gravity: createCheckbox("Gravity", true),
      cohesion: createCheckbox("Cohesion", true),
      clear: createCheckbox("Clear", true),
      amount: createInput(amount)
    };

    ui.reset.mousePressed(setup);
    ui.amount.input(() => {
      amount = ui.amount.value() || 1;
      particles = [];
      setup();
    });
  }


  createCanvas(window.innerWidth, window.innerHeight);
  maxLength = max(width, height);
  stroke(0, 100);

  for (let i = 0; i < amount; i++) {
    particles[i] = new Particle(
      createVector(random(20, width - 20), random(20, height - 20)),
      random(1, 5)
    );

    // particles[i].applyForce(createVector(random(-10, 10), 0));
  }
}

function draw() {
  if (ui.clear.checked()) {
    background(255);
  }

  particles.map(particle => {
    if (mouseIsPressed) {
      particle.applyForce(createVector(mouseX, mouseY).sub(particle.pos).div(3000));
    }

    if (ui.cohesion.checked()) {
      particles.map(p => {
        if (p.num === particle.num) {
          return;
        }

        const neighborDistance = dist(
          particle.pos.x,
          particle.pos.y,
          p.pos.x,
          p.pos.y
        );

        if (neighborDistance < 50) {
          particle.applyForce(
            createVector(
              p.pos.x - particle.pos.x,
              p.pos.y - particle.pos.y
            ).mult(.0004)
          );
        }
      });
    }

    if (ui.gravity.checked()) {
      particle.applyForce(createVector(0, .0981)); // Gravity
    }

    particle.update();
    particle.show();
  });
}

window.addEventListener("resize", () => {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
  maxLength = max(width, height);
});