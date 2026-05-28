console.log("PERLIN VERSION");

let dots = [];
let target;
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

  background(
    245,
    242,
    235,
    80
  );

  drawTarget();

  for (let dot of dots) {

    dot.move();
    dot.display();

  }
}

function drawTarget() {

  push();

  noFill();

  stroke(
    180,
    150,
    120,
    100
  );

  strokeWeight(2);

  circle(
    target.x =
    width/2 + sin(frameCount*0.01)*200;
    target.y =
    height/2 + cos(frameCount*0.008)*150;
  );

  pop();
}

class WanderDot {

  constructor() {

    this.x = random(width);
    this.y = random(height);

    this.size =
      random(5, 18);

    this.speed =
      random(1, 3);

    this.noiseOffset =
      random(1000);

    this.history = [];

    this.orbit =
      random(1) > 0.7;

    this.radius =
      random(60, 180);

    this.angle =
      random(TWO_PI);

    this.orbitSpeed =
      random(
        0.005,
        0.02
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

    }

    else {

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
      this.history.length >
      60
    ) {
      this.history.shift();
    }
  }

  display() {

    noFill();

    stroke(
      100,
      80,
      60,
      60
    );

    strokeWeight(1);

    beginShape();

    for (
      let p
      of this.history
    ) {

      vertex(
        p.x,
        p.y
      );

    }

    endShape();

    fill(
      170,
      130,
      90,
      180
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
