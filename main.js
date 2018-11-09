// Jonas Karg 03.05.2018
// This is my attempt at building a somewhat
// flexible physics engine using basic math.

let particles = [];
let maxLength;
let ui;
let amount = 100;
let particleForce = 0;

function setup() {
  if (!ui) {
    ui = {
      reset: createButton("Reset"),
      gravity: createCheckbox("Gravity", true),
      clear: createCheckbox("Clear", true),
      particleForceSelector: createSelect(),
      newline: createP(),
      amount: createInput(amount)
    };

    ui.reset.mousePressed(setup);

    ui.amount.input(() => {
      amount = ui.amount.value() || 1;
      particles = [];
      setup();
    });

    ui.particleForceSelector.option("No Particle Forces");
    ui.particleForceSelector.option("Attraction");
    ui.particleForceSelector.option("Repulsion");
    ui.particleForceSelector.changed(() => {
      particleForce = {
        "No Particle Forces": 0,
        "Attraction": .0004,
        "Repulsion": -.004
      }[ui.particleForceSelector.value()];
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

    if (particleForce) {
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

        // Cohesion
        if (neighborDistance < 50) {
          particle.applyForce(
            createVector(
              p.pos.x - particle.pos.x,
              p.pos.y - particle.pos.y
            ).mult(particleForce)
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