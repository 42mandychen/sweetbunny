/********* VARIABLES *********/

// stageNum controls the stage
//  -3: Welcome Page
//  -2: Instruction Page
//  -1: Game Over Page
//  0: Game Play Level 0
//  1: Game Play Level 1
//  2: Game Play Level 2
//  3: Game Play Level 3
//  4: Game Play Level 4
//  5: You Win Page

// Numbers
const imgHeight = 70;
const imgWidth = 70;
const numOfSweets = 8;
const numOfOthers = 5;
const canvasWidth = 700;
const canvasHeight = 520;
var stageNum = -3;
var sweetsCollected = 0;
var numS = 0;

// Images
var background;
var sweet;
var bunny;
var bunnies;

// Arrays
var sweets = [];
var xSwts = [];
var ySwts = [];
var sSwts = [];
var visibleSwts = [];
var otherthings = [];
var xOths = [];
var yOths = [];
var sOths = [];
var visibleOths = [];

/********* PRELOAD BLOCK *********/

function preload() {
  // load images
  background = loadImage("data/background.png");
  sweet = loadImage("data/sweet.png");
  bunny = loadImage("data/bunny.png");
  bunny0 = loadImage("data/bunny0.png");
  bunny1 = loadImage("data/bunny1.png");
  bunny2 = loadImage("data/bunny2.png");
  bunny3 = loadImage("data/bunny3.png");
  bunny4 = loadImage("data/bunny4.png");
  bunnies = loadImage("data/bunnies.png");
  youWin = loadImage("data/youWin.png");
  gameOver = loadImage("data/gameOver.png");

  // set up sweets
  for (let i = 0; i < numOfSweets; i++) {
    sweets[i] = loadImage("sweets" + i + ".png"); //load the i-th sweets
    xSwts[i] = random(-imgWidth, canvasWidth + imgWidth);
    ySwts[i] = random(76, height); //set x-i and y-i TODO 76 magic

    if (random(0, 2) < 1) { // TODO magic
      sSwts[i] = random(8, 15);
    } else {
      sSwts[i] = random(-15, -8);
    }
    visibleSwts[i] = true;
  }

  // set up other things
  for (let i = 0; i < numOfOthers; i++) {
    //load the i-th other things
    otherthings[i] = loadImage("otherthings" + i + ".png");
    xOths[i] = random(-imgWidth, canvasWidth + imgWidth);
    yOths[i] = random(76, height); // TODO repetitive code

    if (random(0, 2) < 1) {
      sOths[i] = random(8, 15);
    } else {
      sOths[i] = random(-15, -8);
    }

    visibleOths[i] = true;
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  image(background, 0, 0);
}

function draw() {
  switch (stageNum) {
    case - 3:
      drawWelcome();
      break;
    case - 2:
      drawInstruction();
      break;
    case - 1:
      drawGameOver();
      break;
    case 0:
      drawGamePlay0();
      break;
    case 1:
      drawGamePlay1();
      break;
    case 2:
      drawGamePlay2();
      break;
    case 3:
      drawGamePlay3();
      break;
    case 4:
      drawGamePlay4();
      break;
    case 5:
      drawYouWin();
      break;
  }
}

function keyTyped() {
  if ((key == 'i' || key == 'I') && (stageNum == -3)) {
    stageNum = -2;
  } else if ((key == 's' || key == 'S') && ((stageNum == -3) || (stageNum == -2))) {
    stageNum = 2;
  } else if ((key == 'r' || key == 'R') && ((stageNum == 5) || (stageNum == -1))) {
    setup();
  } else if ((key == 'E' || key == 'e') && ((stageNum == 5) || (stageNum == -1))) {
    exit();
  }
}

function mousePressed() {
  for (let i = 0; i < numOfSweets; i++) {
    if ((mouseX >= xSwts[i] && mouseX <= xSwts[i] + 70) && (mouseY >= ySwts[i] && mouseY <= ySwts[i] + 70)) {
      xSwts[i] = random(-70.0, 770.0);
      ySwts[i] = random(76, height); //set x-i and y-i
      if (numS < 5) {
        numS = numS + 1;
      } else {
        numS = 0;
        stageNum = stageNum + 1;
      }
    }
  }
  for (let i = 0; i < numOfOthers; i++) {
    if ((mouseX >= xOths[i] && mouseX <= xOths[i] + 70) && (mouseY >= yOths[i] && mouseY <= yOths[i] + 70)) {
      xOths[i] = random(-70.0, 770.0);
      yOths[i] = random(76, height);
      stageNum = stageNum - 1;
    }
  }
}

function drawWelcome() {
  image(sweet, 200, 50, 300, 100);
  image(bunny, 210, 130, 300, 100);
  image(bunnies, 120, 400, 500, 100);
  image(bunnies, 120, 300, 500, 100);
  textSize(30);
  fill(0);
  text("Press 'S' to start", 230, 270);
  textSize(30);
  fill(0);
  text("Press 'I' to view the instructions", 156, 300);
}

function drawInstruction() {
  for (let i = 0; i < 8; i++) {
    if (i < 4) {
      image(sweets[i], 100 + 50 * (i + 1), 80, 50, 50);
    } else {
      image(sweets[i], 150 + 50 * (i - 4), 150, 50, 50);
    }
  }
  textSize(30);
  fill(0);
  text("Click on sweets", 150, 50);

  textSize(30);
  fill(0);
  text("Don't click on other things", 150, 250);

  for (let i = 0; i < 5; i++) {
    image(otherthings[i], 100 + 50 * (i + 1), 270, 50, 50);
  }

  textSize(30);
  fill(0);
  text("The more he gets,", 150, 360);
  textSize(30);
  fill(0);
  text("the happier he becomes", 150, 400);

  image(bunny4, 150, 430, 80, 80);
  textSize(30);
  fill(0);
  text("You win", 230, 500);

  image(bunny0, 360, 430, 80, 80);
  textSize(30);
  fill(0);
  text("You lose", 450, 500);

  textSize(30);
  fill(229, 88, 154);
  text("Press 'S' to start!", 450, 50);
}

function drawGamePlay0() {
  image(bunny0, mouseX - 35, mouseY - 35, 70, 70);
  image(bunnies, 100, 10, 300, 60);
  fill(0);
  textSize(30);
  text("Bunny", 10, 25);
  fill(0);
  textSize(30);
  text("State:", 10, 65);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(340, 76, 410, 76);

  for (let i = 0; i < numOfSweets; i = i + 1) {
    if (visibleSwts[i] == true) {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70); //4. display the i-th image
      xSwts[i] = xSwts[i] + sSwts[i];
      if ((xSwts[i] > width) || (xSwts[i] < 0)) {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2) < 1) {
          sSwts[i] = random(8, 15);
        } else {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (let i = 0; i < numOfOthers; i = i + 1) {
    if (visibleOths[i] == true) {
      image(otherthings[i], xOths[i], yOths[i], 70, 70); //4. display the i-th image
      xOths[i] = xOths[i] + sOths[i];
      if ((xOths[i] > width) || (xOths[i] < 0)) {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, canvasHeight);

        if (random(0, 2) < 1) {
          sOths[i] = random(8, 15);
        } else {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

function drawGamePlay1() {
  image(bunny1, mouseX - 35, mouseY - 35, 70, 70);
  image(bunnies, 100, 10, 300, 60);
  fill(0);
  textSize(30);
  text("Bunny", 10, 25);
  fill(0);
  textSize(30);
  text("State:", 10, 65);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(276, 76, 340, 76);

  for (let i = 0; i < numOfSweets; i = i + 1) {
    if (visibleSwts[i] == true) {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70); //4. display the i-th image
      xSwts[i] = xSwts[i] + sSwts[i];
      if ((xSwts[i] > width) || (xSwts[i] < 0)) {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2) < 1) {
          sSwts[i] = random(8, 15);
        } else {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (let i = 0; i < numOfOthers; i = i + 1) {
    if (visibleOths[i] == true) {
      image(otherthings[i], xOths[i], yOths[i], 70, 70); //4. display the i-th image
      xOths[i] = xOths[i] + sOths[i];
      if ((xOths[i] > width) || (xOths[i] < 0)) {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2) < 1) {
          sOths[i] = random(8, 15);
        } else {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

function drawGamePlay2() {
  image(bunny2, mouseX - 35, mouseY - 35, 70, 70);
  image(bunnies, 100, 10, 300, 60);
  fill(0);
  textSize(30);
  text("Bunny", 10, 25);
  fill(0);
  textSize(30);
  text("State:", 10, 65);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(220, 76, 276, 76);

  for (let i = 0; i < numOfSweets; i = i + 1) {
    if (visibleSwts[i] == true) {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70); //4. display the i-th image
      xSwts[i] = xSwts[i] + sSwts[i];
      if ((xSwts[i] > width) || (xSwts[i] < 0)) {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2) < 1) {
          sSwts[i] = random(8, 15);
        } else {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (let i = 0; i < numOfOthers; i = i + 1) {
    if (visibleOths[i] == true) {
      image(otherthings[i], xOths[i], yOths[i], 70, 70); //4. display the i-th image
      xOths[i] = xOths[i] + sOths[i];
      if ((xOths[i] > width) || (xOths[i] < 0)) {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2) < 1) {
          sOths[i] = random(8, 15);
        } else {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

function drawGamePlay3() {
  image(bunny3, mouseX - 35, mouseY - 35, 70, 70);
  image(bunnies, 100, 10, 300, 60);
  fill(0);
  textSize(30);
  text("Bunny", 10, 25);
  fill(0);
  textSize(30);
  text("State:", 10, 65);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(158, 76, 220, 76);

  for (let i = 0; i < numOfSweets; i++) {
    if (visibleSwts[i] == true) {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70); //4. display the i-th image
      xSwts[i] = xSwts[i] + sSwts[i];
      if ((xSwts[i] > width) || (xSwts[i] < 0)) {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2) < 1) {
          sSwts[i] = random(8, 15);
        } else {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (let i = 0; i < numOfOthers; i++) {
    if (visibleOths[i] == true) {
      image(otherthings[i], xOths[i], yOths[i], 70, 70); //4. display the i-th image
      xOths[i] = xOths[i] + sOths[i];
      if ((xOths[i] > width) || (xOths[i] < 0)) {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2) < 1) {
          sOths[i] = random(8, 15);
        } else {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

function drawGamePlay4() {

  image(bunny4, mouseX - 35, mouseY - 35, 70, 70);
  image(bunnies, 100, 10, 300, 60);
  fill(0);
  textSize(30);
  text("Bunny", 10, 25);
  fill(0);
  textSize(30);
  text("State:", 10, 65);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(98, 76, 158, 76);

  for (let i = 0; i < numOfSweets; i++) {
    if (visibleSwts[i] == true) {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70); //4. display the i-th image
      xSwts[i] = xSwts[i] + sSwts[i];
      if ((xSwts[i] > width) || (xSwts[i] < 0)) {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2) < 1) {
          sSwts[i] = random(8, 15);
        } else {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (let i = 0; i < numOfOthers; i++) {
    if (visibleOths[i] == true) {
      image(otherthings[i], xOths[i], yOths[i], 70, 70); //4. display the i-th image
      xOths[i] = xOths[i] + sOths[i];
      if ((xOths[i] > width) || (xOths[i] < 0)) {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2) < 1) {
          sOths[i] = random(8, 15);
        } else {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

function drawYouWin() {
  image(youWin, 160, 100, 350, 200);
  fill(0);
  textSize(30);
  text("Press 'R' to restart", 200, 320);
  fill(0);
  textSize(30);
  text("Press 'E' to exit", 200, 350);
}

function drawGameOver() {
  image(gameOver, 160, 100, 350, 200);
  fill(0);
  textSize(30);
  text("Press 'R' to restart", 200, 320);
  fill(0);
  textSize(30);
  text("Press 'E' to exit", 200, 350);
}
