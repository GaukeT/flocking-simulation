
let abos = [];
let slider;
let amountOfFlocks = 200;

let slider_cohesion;
let slider_separation;
let slider_alignment;


function setup() {
  createCanvas(windowWidth, windowHeight);
  createBoidsArray()
  setupSlider();
}

function draw() {
  amountOfFlocks = slider.value();
  background(220);

  if (amountOfFlocks !== abos.length) {
    createBoidsArray();
  }

  textSize(32);
  text(abos.length, 10, 30);

  textSize(20);
  text("Cohesion", 10, windowHeight - 40);
  text("Separation", 210, windowHeight - 40);
  text("Alignment", 420, windowHeight - 40);
  text(slider_cohesion.value(), 150, windowHeight - 15);
  text(slider_separation.value(), 350, windowHeight - 15);
  text(slider_alignment.value(), 560, windowHeight - 15);


  for (let aboid of abos) {
    aboid.flock(abos);
    aboid.edge();
    aboid.update();
    aboid.show(); 
  }
}

function createBoidsArray() {
    abos = [];
    for(let i = 0; i < (amountOfFlocks); i++) {
        abos.push(new boid());
    }
}

function setupSlider() {
  // createSlider(min, max, default, step_size);
  slider = createSlider(5, 250, 200, 5);
  slider.position(80, 10);
  slider.style('width', '100px');

  slider_cohesion = createSlider(0.05, 5, 1, 0.05);
  slider_separation = createSlider(0.05, 5, 1, 0.05);
  slider_alignment = createSlider(0.05, 5, 1, 0.05);

  slider_cohesion.position(10, windowHeight - 30);
  slider_separation.position(210, windowHeight - 30);
  slider_alignment.position(420, windowHeight - 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

