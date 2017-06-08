var s;
var scl = 20;
var status = "";
var food;
var alive;
var gameMode = 0; //0 = welcome screen, 1 = playing
var finalScore = 0;


function setup() {
  createCanvas(1000,600);
  console.log("hello");
  s = new Snake();
  alive = true;
  frameRate(10);
  setFoodLocation();
}

function draw() {
  if (gameMode == 0) {
    alive = true;
    background(0,45,45);
    fill(118,21,21,20)
    textSize(70)
    fill(255,255,255)
    textFont("AnglicanText")
    text("Sneaky Snake",180,120);
  }
  if (gameMode == 1) {
    background(240, 200, 200);
    if (s.eat(food)) {
      setFoodLocation();
    }
  s.death();
  if (alive == false) {
    (gameMode = 2);
    console.log(gameMode);
  }

  s.update();
  s.show();

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

//displays current length of snake
    status = "length: " + s.total;
    text(status,180,120);
  }

  if (gameMode == 2) {
      background (0,45,45);
      textSize (150);
      text("Game Over",200,170);
      textSize (70);
      text("Final Score: " + finalScore,570,470);
    }
}

  // TODO: Extensions...
  //       1. add a cheat. if mousePressed is true,
  //          increase "s.total" (without the quotes) by one.
  //       2. check if the snake is dead. If it is,
  //          tell the user that the game is over!
  //       3. after you do #2, give the user an option to
  //          restart the game (keyPress?)
  //       4. change any other parameters in the game (speed, size, colors, etc)
  //            - first tinker on your own
  //            - then ask a colleague if you need help or ideas
  //       Then replace this comment with one of your own.


function keyPressed() {
  console.log("key is TYPED");
  if (gameMode == 0) {
    gameMode = 1;
  } else if (gameMode == 1) {
    //move the snake
    if (keyCode == UP_ARROW) {
      s.dir(0,-1);
    }
    if (keyCode == DOWN_ARROW) {
      s.dir(0,1);
    }
    if (keyCode == LEFT_ARROW) {
      s.dir(-1,0)
    }
    if (keyCode == RIGHT_ARROW) {
      s.dir(1,0)
    }
  }
  if (gameMode == 2) {
    gameMode = 0;
  }
}



function setFoodLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        finalScore = this.total;
        this.total = 0;
        this.tail = [];
        alive = false;
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
