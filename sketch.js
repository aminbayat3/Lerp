let width = 640;
let height = 480;
let win = false;

const click = document.getElementById("clicks");

// enemies
let e_a = [],
  e_b = [],
  e_p = [];
let e_f = [],
  e_m = [];
let num_enemies = 5;
// player
let a, b, pos;
let f = 0;
let clicks = 0;

function setup() {
  createCanvas(640, 480);
  // init the enemies
  for (let i = 0; i < num_enemies; i++) {
    // for each enemy
    // random route:
    e_a[i] = createVector(random(20, 620), random(20, 460));
    e_b[i] = createVector(random(20, 620), random(20, 460));
    // random start and movement speed:
    e_f[i] = random(0, 1);
    e_m[i] = random(0.005, 0.025);
  }
  // init the player
  a = createVector(10, 10);
  b = createVector(10, 10);
}

function draw() {
  background(0);
  if (win) {
    // move and paint the enemy:
    stroke("#FF0000");
    fill(0, 255, 0);
    for (let i = 0; i < num_enemies; i++) {
      e_p[i] = p5.Vector.add(
        p5.Vector.mult(e_a[i], 1 - ease(e_f[i])),
        p5.Vector.mult(e_b[i], ease(e_f[i]))
      );
      ellipse(e_p[i].x, e_p[i].y, 25, 25);
      // move per frame:
      e_f[i] = e_f[i] + e_m[i];
      // turn around after reaching end point:
      if (e_f[i] >= 1 || e_f[i] <= 0) e_m[i] = -e_m[i];

      goal();

      textSize(40);
      fill(0, 255, 0);
      text("You Won!", (width / 2) - 80, height / 2);
    }
  } else {
    // move and paint the enemy:
    stroke("#FF0000");
    fill("#FF0000");
    for (let i = 0; i < num_enemies; i++) {
      e_p[i] = p5.Vector.add(
        p5.Vector.mult(e_a[i], 1 - ease(e_f[i])),
        p5.Vector.mult(e_b[i], ease(e_f[i]))
      );
      ellipse(e_p[i].x, e_p[i].y, 25, 25);
      // move per frame:
      e_f[i] = e_f[i] + e_m[i];
      // turn around after reaching end point:
      if (e_f[i] >= 1 || e_f[i] <= 0) e_m[i] = -e_m[i];
    }

    stroke(255);
    fill("#FFFFFF");
    pos = p5.Vector.add(p5.Vector.mult(a, 1 - f), p5.Vector.mult(b, f));
    ellipse(pos.x, pos.y, 10, 10);

    if (f < 1) {
      f = f + 0.02;
    }
    goal();

    if (
      pos.x > width / 2 - 40 &&
      pos.x < width / 2 + 40 &&
      pos.y > height - 40
    ) {
      win = true;
    }
  }
}

function mouseReleased() {
  a = createVector(pos.x, pos.y);
  b = createVector(mouseX, mouseY);
  !win && clicks++;
  click.innerHTML = `${clicks} CLICKS`;

  f = 0;
}

function goal() {
  push(); // push current transformation matrix
  translate(width / 2, height); // move to center of x-axis
  rotate(PI); // rotate 180 degrees

  // draw a semi-circle
  fill("#ffff");
  stroke(0);
  strokeWeight(10);
  arc(0, 0, 80, 80, 0, PI);

  pop();
}

function ease(f) {
  // return f*f; // smooth start
  // return 1-(1-f)*(1-f); // smooth stop
  return (1 - f) * (f * f * f) + f * (1 - (1 - f) * (1 - f) * (1 - f)); // blend both ...
}
