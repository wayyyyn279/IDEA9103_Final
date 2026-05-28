let dots = [];
let target;

function setup() {

  createCanvas(windowWidth, windowHeight);

  target = createVector(
    width / 2,
    height / 2
  );

  for (let i = 0; i < 18; i++) {

    dots.push(
      new WanderDot()
    );

  }

  background(245);
}

function draw() {

  if (!mouseIsPressed) {

    target.x =
      width / 2 +
      sin(frameCount * 0.01) * 250;

    target.y =
      height / 2 +
      cos(frameCount * 0.013) * 180;

  } else {

    target.x = mouseX;
    target.y = mouseY;

  }

  background(
    245,
    242,
    235,
    35
  );

  drawTarget();

  for (let dot of dots) {

    dot.move();
    dot.display();

  }

  drawGrid();
}

function drawTarget() {

  push();

  noStroke();

  fill(
    255,
    170,
    90,
    255
  );

  circle(
    target.x,
    target.y,
    18
  );

  noFill();

  stroke(
    200,
    170,
    130,
    80
  );

  strokeWeight(2);

  circle(
    target.x,
    target.y,
    100
  );

  circle(
    target.x,
    target.y,
    180
  );

  pop();
}

function drawGrid() {

  stroke(
    180,
    160,
    140,
    20
  );

  strokeWeight(1);

  for (
    let x = 0;
    x < width;
    x += 120
  ) {

    line(
      x,
      0,
      x,
      height
    );

  }

  for (
    let y = 0;
    y < height;
    y += 120
  ) {

    line(
      0,
      y,
      width,
      y
    );

  }
}

class WanderDot {

  constructor() {

    this.x =
      random(width);

    this.y =
      random(height);

    this.size =
      random(6, 14);

    this.speed =
      random(1, 2);

    this.noiseOffset =
      random(1000);

    this.history = [];

    this.orbit =
      random(1) > 0.5;

    this.radius =
      random(50, 150);

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

      let dx =
        target.x - this.x;

      let dy =
        target.y - this.y;

      this.x +=
        dx * 0.002;

      this.y +=
        dy * 0.002;
    }

    this.history.push(
      createVector(
        this.x,
        this.y
      )
    );

    if (
      this.history.length > 50
    ) {

      this.history.shift();

    }
  }

  display() {

    noFill();

    stroke(
      90,
      60,
      40,
      120
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
      190,
      145,
      90,
      220
    );

    noStroke();

    circle(
      this.x,
      this.y,
      this.size
    );
  }
}

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

}
