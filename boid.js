class boid {
  
  constructor() {
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    
    this.radius = 4;
	this.perception = this.radius*20;
//    this.mass = this.radius*this.radius*PI;

    this.maxSpeed = 5;
    this.maxForce = 0.5;
  }
  
  update() {
    this.pos.add(this.vel);
	this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);	
    
    this.acc.mult(0);
  }
  
  applyForce(force) {
//    let f = p5.Vector.div(force, this.mass);
    this.acc.add(force);
  }
  
  flock(boids) {
    let se = this.separation(boids);
    let al = this.alignment(boids);
    let co = this.cohesion(boids);
	
	se.mult(slider_separation.value());
	al.mult(slider_alignment.value());
	co.mult(slider_cohesion.value());
		
	this.applyForce(se);
	this.applyForce(al);
	this.applyForce(co);
  }
  
  separation(boids) {
    //steer to avoid crowding local flockmates
    let steering = createVector();
    let count = 0;
    
    for (let boid of boids) {
      if (this != boid) {
        let di = p5.Vector.dist(this.pos, boid.pos);
        if (di < this.perception) {
          let diff = p5.Vector.sub(this.pos, boid.pos);
          diff.div(di * di);
          steering.add(diff);
          count++;
        }
      }
    }
    
    if (count != 0) {
      steering = p5.Vector.div(steering, count);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
     }
	 
	 return steering;
  }
  
  alignment(boids) {
    // steer towards the average heading of local flockmates
    let steering = createVector();
    let count = 0;
    
    for (let boid of boids) {
      if (this != boid) {
        let di = p5.Vector.dist(this.pos, boid.pos);
        if (di < this.perception) {
          steering.add(boid.vel);
          count++;
        }
      }
    }
    
    if (count != 0) {
      steering = p5.Vector.div(steering, count);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
	
	return steering;
  }
  
  cohesion(boids) {
    // steer to move toward the average position of local flockmates
    let steering = createVector();
    let count = 0;
    
    for (let boid of boids) {
      if (this != boid) {
        let di = p5.Vector.dist(this.pos, boid.pos);
        if (di < this.perception) {
          steering.add(boid.pos);
          count++;
        }
      }
    }
    
    if (count != 0) {
      steering = p5.Vector.div(steering, count);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }    
	
	return steering;
  }
  
  show() {
    this.shape();
  }
  
  shape() {
//    noFill();
//    stroke(0, 200, 0, 50);
//    circle(this.pos.x, this.pos.y, this.perception);
    
    let theta = this.vel.heading() + PI/2;
    fill(175);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.radius*2);
    vertex(-this.radius, this.radius*2);
    vertex(this.radius, this.radius*2);
    endShape(CLOSE);
    pop();
  }
  
  edge() {
    // come back on the other side
    if (this.pos.x < 0) this.pos.x = width
    else if (this.pos.x > width) this.pos.x = 0;

    if (this.pos.y < 0) this.pos.y = height
    else if (this.pos.y > height) this.pos.y = 0;
    
    // bounce back in. 
//    if ((this.pos.x > width) || (this.pos.x < 0)) {
//      this.vel.x = this.vel.x * -1;
//    }
//
//    if ((this.pos.y > height) || (this.pos.y < 0)) {
//      this.vel.y = this.vel.y * -1;
//    }
  }
}