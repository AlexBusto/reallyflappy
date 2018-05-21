let pillars = [];

let x = 0, y = 0, w = 0, h = 0;
var xb = 0, yb = 0, wb = 0, hb = 0;
var ySpeed = 0;
var deleter = 0, endgame = 0;
var xf = 0, yf = 0, wf = 0, hf = 0;
var score = 0, hiScore = 0;
var reseter = 0;

var noahBird, thiskid, pillarimg;

var q = 0;

function preload(){
  noahBird = loadImage("noahhh.png");
  thiskid = loadImage("thiskid.jpg");
  pillarimg = loadImage("pillar.png");
}

function setup() {
  createCanvas(1400, 900);
  xf = 0;
  wf = width;
  hf = 50;
  yf = height - hf;
  for (let i = 0; i < 3; i++){
    x = width + q;
    q += 600;
    y = 0;
    w = 100;
    h = random(20, 550);
    pillars[i] = new Pillar(x, y, w, h);
  }
  xb = 100;
  yb = height/2;
  wb = 100;
  hb = 100;
}


function draw() {
  background(0);
  imageMode(CORNER);
  image(thiskid, 0, 0, width, height);
  fill(72, 244, 66)
  rect(xf, yf, wf, hf);
  if (endgame == 0){
    for(let i = 0; i < pillars.length; i++){
      if (deleter == 1){
        pillars[0].move();
        pillars[0].show();
        deleter = 0;
        i = 0;
      } else {
        pillars[i].move();
        pillars[i].show();
      }
    }
    imageMode(CENTER);
    image(noahBird, xb, yb, wb, hb);
    ySpeed = ySpeed + 0.5;
    yb += ySpeed;
    if(yb + hb/2 >= yf){
      endgame = 1;
    }
    showScore(0, 255, 0);
    if (score > hiScore){
      hiScore = score;
    }
  } else {
    background(0);
    var buttonx = width/2 - 300;
    var buttony = height - (height/4) - 100;
    var buttonw = 600;
    var buttonh = 100;
    fill(255, 0, 0);
    rect(buttonx, buttony, buttonw, buttonh);
    if(mouseIsPressed && mouseX >= buttonx && mouseX <= buttonx + buttonw && mouseY >= buttony && mouseY <= buttony + buttonh){
      reset();
    }
    showScore(255, 0, 0);
    fill(255,0,0);
    textSize(100);
    textAlign(CENTER);
    text ("Game Over", width/2, height/2 - 20);
    textSize(40);
    fill(0);
    text ("Press to Restart", width/2, height - (height/4) - 40);
  }
}

function mousePressed(){
  ySpeed = -10;
}

function keyIsPressed(){
  if(keyCode === LEFT_ARROW){
    reseter = TRUE;
  }
}

function showScore(rd, grn, blu){
  textAlign(LEFT);
  fill (rd, grn, blu);
  textSize(40);
  text("Score: " + score/41, 20, 50);
  text("High Score: " + hiScore / 41, 20, 100);
}

function reset(){
  pillars.splice(0);
  q = 0;
  for (let i = 0; i < 3; i++){
    x = width + q;
    q += 600;
    y = 0;
    w = 100;
    h = random(20, 550);
    pillars[i] = new Pillar(x, y, w, h);
  }
  yb = height/2;
  score = 0;
  endgame = 0;
  deleter = 0;
}

class Pillar {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  move(){
    this.x -= 5;
  }
  show(){
    fill(72, 244, 66);
    imageMode(CORNER);
    image(pillarimg, this.x, this.y, this.w, this.h);
    image(pillarimg, this.x, this.y + this.h + 300, this.w, height - (this.h + 300))
    if(this.x < -100){
      pillars.splice(0, 1);
      deleter = 1;
      pillars[2] = new Pillar(width + 300, 0, 100, random(50, 550));
    }
    if(this.x <= xb + wb/2 && this.x + 100 >= xb - wb/2 && this.h > yb - hb/2){
      endgame = 1;
    } else if (this.x <= xb + wb/2 && this.x + 100 >= xb - wb/2 && yb + hb/2 >= this.y + this.h + 300) {
      endgame = 1;
    } else if (this.x <= xb + wb/2 && this.x + 100 >= xb - wb/2 && yb + hb/2 >= this.h && yb <= this.h + 300) {
      score++;
    }
  }
}
