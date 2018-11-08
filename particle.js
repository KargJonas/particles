let count = 0;

class Particle {
  constructor(pos, mass, color) {
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.step = createVector(0, 0);
    this.color = color;
    this.mass = mass;
    this.size = mass * 4;

    this.minX = this.size;
    this.maxX = width - this.size;
    this.minY = this.size;
    this.maxY = height - this.size;

    this.num = count;
    count++;
  }

  applyForce(force) {
    this.acc.add(force.div(this.mass));
    this.acc.limit(1);
  }

  update() {
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.step = p5.Vector.add(this.pos, this.vel);

    if (this.step.x < this.minX || this.step.x > this.maxX || this.step.y < this.minY || this.step.y > this.maxY) {
      if (this.step.x < this.minX || this.step.x > this.maxX) {
        this.vel.x *= -1;
      }

      if (this.step.y < this.minY || this.step.y > this.maxY) {
        this.vel.y *= -1;
      }

      this.vel.mult(0.5); // Energy being lost on impact
    }

    this.pos.add(this.vel);
  }

  show() {
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
    // ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}