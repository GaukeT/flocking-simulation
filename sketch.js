const amountOfFlocks = 250;
let abos = [];

function setup() {
//   createCanvas(windowWidth, windowHeight);
  createCanvas(800, 800);

  for(let i = 0; i < (amountOfFlocks); i++) {
      abos.push(new boid());
  }
}

function draw() {
  background(220);

  textSize(32);
  text(abos.length, 10, 30);

  for (let aboid of abos) {
    aboid.flock(abos);
    aboid.edge();
    aboid.update();
    aboid.show(); 
  }

//
//  if (mouseIsPressed) {
//    abos.push(new boid());
//  }
}

//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}

