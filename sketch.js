let dots = [];
let target;

function setup() {

  createCanvas(windowWidth, windowHeight);

  target = createVector(
    width / 2,
    height / 2
  );

  for (let i = 0; i < 15; i++) {

    dots.push(
      new WanderDot()
    );

  }

  background(245);
}

function draw() {

  target.x =
    width / 2 +
    sin(frameCount * 0.01) * 250;

  target.y =
    height / 2 +
    cos(frameCount * 0.013) * 180;

  background(
    245,
    242,
    235,
    70
  );

  drawTarget();

  for (let dot of dots) {

    dot.move();
    dot.display();

  }
}

function drawTarget() {

  push();

  noStroke();

  fill(
    255,
    220,
    180,
    220
  );

  circle(
    target.x,
    target.y,
    18
  );

  noFill();

  stroke(
    190,
    160,
    120,
    80
  );

  strokeWeight(2);

  circle(
    target.x,
    target.y,
    120
  );

  pop();
}

class WanderDot {

  constructor() {

    this.x = random(width);
    this.y = random(height);

    this.size =
      random(6, 16);

    this.speed =
      random(1, 2);

    this.noiseOffset =
      random(1000);

    this.history = [];

    this.orbit =
      random(1) > 0.6;

    this.radius =
      random(50, 140);

    this.angle =
      random(TWO_PI);

    this.orbitSpeed =
      random(
        0.01,
        0.03
      );
  }

  move() {

    if (this.orbit) {

      this.angle +=
        this.orbitSpeed;

      this.x =
        target.x +
        cos(this.angle)
        * this.radius;

      this.y =
        target.y +
        sin(this.angle)
        * this.radius;

    } else {

      let angle =
        noise(
          this.noiseOffset
        ) *
        TWO_PI *
        4;

      this.x +=
        cos(angle)
        * this.speed;

      this.y +=
        sin(angle)
        * this.speed;

      this.noiseOffset +=
        0.01;
    }

    if (this.x < 0)
      this.x = width;

    if (this.x > width)
      this.x = 0;

    if (this.y < 0)
      this.y = height;

    if (this.y > height)
      this.y = 0;

    this.history.push(
      createVector(
        this.x,
        this.y
      )
    );

    if (
      this.history.length > 40
    ) {

      this.history.shift();

    }
  }

  display() {

    noFill();

    stroke(
      120,
      95,
      70,
      80
    );

    strokeWeight(1.2);

    beginShape();

    for (
      let p of this.history
    ) {

      vertex(
        p.x,
        p.y
      );

    }

    endShape();

    fill(
      185,
      145,
      100,
      180
    );

    noStroke();

    circle(
      this.x,
      this.y,
      this.size +
      sin(
        frameCount * 0.05
      ) * 2
    );
  }
}

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );
}
