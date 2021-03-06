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
const numOfBunnies = 5;
const numOfSweets = 8;
const numOfOthers = 5;
const canvasWidth = 700;
const canvasHeight = 520;
var stageNum = -3;
var numOfSweetsCollected = 0;

// Images
var background;
var sweet;
var bunny;
var rowOfBunnies;

// Arrays
var bunnies = [];
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
  rowOfBunnies = loadImage("data/bunnies.png");
  youWin = loadImage("data/youWin.png");
  gameOver = loadImage("data/gameOver.png");
  loadBunnies();

  // set up sweets
  for (let i = 0; i < numOfSweets; i++) {
    //load the i-th sweets
    sweets[i] = loadImage("data/sweets" + i + ".png");
    generateRandomXpos(xSwts, i);
    generateRandomYpos(ySwts, i);
    generateRandomSpeed(sSwts, i);
    visibleSwts[i] = true;
  }

  // set up other things
  for (let i = 0; i < numOfOthers; i++) {
    //load the i-th other things
    otherthings[i] = loadImage("data/otherthings" + i + ".png");
    generateRandomXpos(xOths, i);
    generateRandomYpos(yOths, i);
    generateRandomSpeed(sOths, i);
    visibleOths[i] = true;
  }
}

/********* SETUP BLOCK *********/

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  // Move the canvas so it's inside our <div id="sweetbunny">.
  canvas.parent('sweetbunny');
  image(background, 0, 0);
  stageNum = -3;
}

/********* DRAW BLOCK *********/

function draw() {
  switch (stageNum) {
    case -3:
      drawWelcome();
      break;
    case -2:
      drawInstruction();
      break;
    case -1:
      drawResult(false);
      break;
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      drawGamePlay(stageNum);
      break;
    case 5:
      drawResult(true);
      break;
  }
}

/********* KEY BLOCK *********/

function keyTyped() {
  if ((key === 'i' || key === 'I') && (stageNum === -3)) {
    stageNum = -2;
  } else if ((key === 's' || key === 'S') && ((stageNum === -3) || (stageNum === -2))) {
    stageNum = 2;
  } else if ((key === 'r' || key === 'R') && ((stageNum === 5) || (stageNum === -1))) {
    setup();
  }
}

/********* MOUSE BLOCK *********/

function mousePressed() {
  for (let i = 0; i < numOfSweets; i++) {
    if (pressedOnObject(mouseX, mouseY, xSwts[i], ySwts[i])) {
      generateRandomXpos(xSwts, i);
      generateRandomYpos(ySwts, i);
      updateStage();
      return;
    }
  }
  for (let i = 0; i < numOfOthers; i++) {
    if (pressedOnObject(mouseX, mouseY, xOths[i], yOths[i])) {
      generateRandomXpos(xOths, i);
      generateRandomYpos(yOths, i);
      stageNum = stageNum - 1;
      return;
    }
  }
}

/********* STAGES *********/

function drawWelcome() {
  image(background, 0, 0); // reset background
  image(sweet, 200, 50, 300, 100);
  image(bunny, 210, 130, 300, 100);
  image(rowOfBunnies, 120, 400, 500, 100);
  image(rowOfBunnies, 120, 300, 500, 100);
  displayText(0, 30, "Press 'S' to start", 230, 270);
  displayText(0, 30, "Press 'I' to view the instructions", 156, 300);
}

function drawInstruction() {
  image(background, 0, 0); // reset background
  displayText(0, 30, "Click on sweets", 150, 50);
  drawRowOfSweets();
  displayText(0, 30, "Don't click on other things", 150, 250);
  drawRowOfOthers();
  displayText(0, 30, "The more he gets,", 150, 360);
  displayText(0, 30, "the happier he becomes", 150, 400);
  image(bunnies[numOfBunnies - 1], 150, 430, 80, 80);
  displayText(0, 30, "You win", 230, 500);
  image(bunnies[0], 360, 430, 80, 80);
  displayText(0, 30, "You lose", 450, 500);
  let c = color(229, 88, 154);
  displayText(c, 30, "Press 'S' to start!", 450, 50);
}

function drawGamePlay(level) {
  image(background, 0, 0); // reset background
  let currBunny = bunnies[level];
  image(currBunny, mouseX - 35, mouseY - 35, imgWidth, imgHeight);
  image(rowOfBunnies, 100, 10, 300, 60);
  displayText(0, 30, "Bunny", 10, 25);
  displayText(0, 30, "State:", 10, 65);
  drawLevel(level);

  for (let i = 0; i < numOfSweets; i = i + 1) {
    if (visibleSwts[i] === true) {
      image(sweets[i], xSwts[i], ySwts[i], imgWidth, imgHeight);
      xSwts[i] += sSwts[i];
      if (outOfScreen(xSwts[i])) {
        generateRandomXpos(xSwts, i);
        generateRandomYpos(ySwts, i);
        generateRandomSpeed(sSwts, i);
      }
    }
  }
  for (let i = 0; i < numOfOthers; i = i + 1) {
    if (visibleOths[i] === true) {
      image(otherthings[i], xOths[i], yOths[i], imgWidth, imgHeight);
      xOths[i] += sOths[i];
      if (outOfScreen(xOths[i])) {
        generateRandomXpos(xOths, i);
        generateRandomYpos(yOths, i);
        generateRandomSpeed(sOths, i);
      }
    }
  }
}

function drawResult(won) {
  image(background, 0, 0); // reset background
  if (won === true) {
    image(youWin, 160, 100, 350, 200);
  } else { //'lose'
    image(gameOver, 160, 100, 350, 200);
  }
  displayText(0, 30, "Press 'R' to restart", 200, 320);
}

/********* HELPERS *********/
function loadBunnies() {
  for (let i = 0; i < numOfBunnies; i++) {
    bunnies[i] = loadImage("data/bunny" + i + ".png"); //load the i-th bunny
  }
}

function generateRandomXpos(array, index) {
  array[index] = (Math.random() * (2 * imgWidth + canvasWidth)) - imgWidth;
}

function generateRandomYpos(array, index) {
  array[index] = (Math.random() * (canvasHeight - 76)) + 76;
}

function generateRandomSpeed(array, index) {
  if (Math.random() < 0.5) {
    array[index] = (Math.random() * 2) + 5;
  } else {
    array[index] = (Math.random() * 2) - 5;
  }
}

function updateStage() {
  if (numOfSweetsCollected < 5) {
    numOfSweetsCollected++;
  } else {
    numOfSweetsCollected = 0;
    stageNum = stageNum + 1;
  }
}

function displayText(color, size, str, posX, posY) {
  fill(color);
  textSize(size);
  text(str, posX, posY);
}

function drawRowOfSweets() {
  for (let i = 0; i < 8; i++) {
    if (i < 4) {
      image(sweets[i], 100 + 50 * (i + 1), 80, 50, 50);
    } else {
      image(sweets[i], 150 + 50 * (i - 4), 150, 50, 50);
    }
  }
}

function drawRowOfOthers() {
  for (let i = 0; i < 5; i++) {
    image(otherthings[i], 100 + 50 * (i + 1), 270, 50, 50);
  }
}

function drawLevel(level) {
  stroke(255, 0, 0);
  strokeWeight(4);
  if (level === 0) {
    line(340, 76, 410, 76);
  } else if (level === 1) {
    line(276, 76, 340, 76);
  } else if (level === 2) {
    line(220, 76, 276, 76);
  } else if (level === 3) {
    line(158, 76, 220, 76);
  } else if (level === 4) {
    line(98, 76, 158, 76);
  }
}

function outOfScreen(xPos) {
  return (xPos > width) || (xPos < 0);
}

function pressedOnObject(mouseX, mouseY, objectX, objectY) {
  return (mouseX >= objectX && mouseX <= objectX + imgWidth)
  && (mouseY >= objectY && mouseY <= objectY + imgHeight);
}
