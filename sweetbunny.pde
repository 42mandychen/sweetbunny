int stageNum, imgHeight, imgWidth;
PImage sweet, bunny, bunnies, background, bunny4, bunny0, bunny1, bunny2, bunny3, youWin, gameOver;
PImage [] sweets = new PImage[8];
PImage [] otherthings = new PImage [5];
boolean [] visibleSwts = new boolean [8];
boolean [] visibleOths = new boolean [5];
float [] xSwts = new float [8];
float [] ySwts = new float [8];
float [] sSwts = new float [8];
float [] xOths = new float [5];
float [] yOths = new float [5];
float [] sOths = new float [5];
int numS;

void setup()
{
  size(700, 520);
  imgWidth = imgHeight = 70;
  background = loadImage("background.png");
  for (int i = 0; i < sweets.length; i=i+1)
  {
    sweets[i] = loadImage("sweets"+i+".png");  //load the i-th sweets

    xSwts[i] = random(-70.0, 770.0); 
    ySwts[i] = random(76, height);  //set x-i and y-i
    if (random(0, 2)<1)
    {
      sSwts[i] = random(8, 15);
    } else
    {
      sSwts[i] = random(-15, -8);
    }

    visibleSwts[i] = true;
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    otherthings[i] = loadImage("otherthings"+i+".png");  //load the i-th other things
    xOths[i] = random(-70.0, 770.0);
    yOths[i] = random(76, height);

    if (random(0, 2)<1)
    {
      sOths[i] = random(8, 15);
    } else
    {
      sOths[i] = random(-15, -8);
    }

    visibleOths[i] = true;
  }
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

    stageNum = -3;
}

void draw()
{
  if (stageNum == -3)
  {
    drawWelcome();
  } else if (stageNum == -2)
  {
    drawInstruction();
  } else if (stageNum == -1)
  {
    drawGameOver();
  } else if (stageNum == 0)
  {
    drawGamePlay0();
  } else if (stageNum == 1)
  {
    drawGamePlay1();
  } else if (stageNum == 2)
  {
    drawGamePlay2();
  } else if (stageNum == 3)
  {
    drawGamePlay3();
  } else if (stageNum == 4)
  {
    drawGamePlay4();
  } else if (stageNum == 5)
  {
    drawYouWin();
  }
}

void keyPressed()
{
  if ((key == 'i' || key == 'I') && (stageNum == -3))
  {
    stageNum = -2;
  } else if ((key == 's' || key == 'S') && ((stageNum == -3 )||(stageNum == -2)))
  {
    stageNum = 2;
  } else if ((key == 'r' || key == 'R') && ((stageNum == 5 )|| (stageNum == -1)))
  {
    setup();
  } else if ((key == 'E' || key == 'e') && ((stageNum == 5)|| (stageNum == -1)))
  {
    exit();
  }
}
void mousePressed()
{
  for (int i=0; i<sweets.length; i=i+1)
  {
    if ((mouseX>=xSwts[i]&&mouseX<=xSwts[i]+70)&&(mouseY>=ySwts[i]&&mouseY<=ySwts[i]+70))
    {
      //visibleSwts[i]=false;
      xSwts[i] = random(-70.0, 770.0); 
      ySwts[i] = random(76, height);  //set x-i and y-i
      if (numS <5)
      {
        numS = numS + 1;
      } else
      {
        numS = 0;
        stageNum = stageNum + 1;
      }
    }
  }
  for (int i=0; i<otherthings.length; i=i+1)
  {
    if ((mouseX>=xOths[i]&&mouseX<=xOths[i]+70)&&(mouseY>=yOths[i]&&mouseY<=yOths[i]+70))
    {
      //   visibleOths[i]=false;
      xOths[i] = random(-70.0, 770.0);
      yOths[i] = random(76, height);
      stageNum = stageNum - 1;
    }
  }
}
void drawWelcome()
{
  sweet = loadImage("sweet.png");
  bunny = loadImage("bunny.png");
  bunnies = loadImage("bunnies.png");
  image(background, 0, 0);
  image(sweet, 200, 50, 300, 100);
  image(bunny, 210, 130, 300, 100);
  image(bunnies, 120, 400, 500, 100);
  image(bunnies, 120, 300, 500, 100);
  println(mouseX, mouseY);
  textSize(30);  
  fill(0);
  text("Press 'S' to start", 230, 270);
  textSize(30);
  fill(0);
  text("Press 'I' to view the instructions", 156, 300);
}

void drawInstruction()
{
  image(background, 0, 0);
  for (int i=0; i<8; i++)
  {
    if (i<4)
    {
      image(sweets[i], 100+50*(i+1), 80, 50, 50);
    } else
    {
      image(sweets[i], 150+50*(i-4), 150, 50, 50);
    }
  }
  textSize(30);  
  fill(0);
  text("Click on sweets", 150, 50);

  textSize(30);  
  fill(0);
  text("Don't click on other things", 150, 250);

  for (int i=0; i<5; i++)
  {
    image(otherthings[i], 100+50*(i+1), 270, 50, 50);
  }


  textSize(30);  
  fill(0);
  text("The more he gets,", 150, 360);
  textSize(30);  
  fill(0);
  text("the happier he becomes", 150, 400);

  bunny4 = loadImage("bunny4.png");
  image(bunny4, 150, 430, 80, 80);
  textSize(30);  
  fill(0);
  text("You win", 230, 500);
  bunny0 = loadImage("bunny0.png");
  image(bunny0, 360, 430, 80, 80);
  textSize(30);  
  fill(0);
  text("You lose", 450, 500);

  textSize(30);  
  fill(229, 88, 154);
  text("Press 'S' to start!", 450, 50);
}

void drawGamePlay0()
{
  image(background, 0, 0);
  bunnies = loadImage("bunnies.png");
  bunny0 = loadImage("bunny0.png");
  image(bunny0, mouseX-35, mouseY-35, 70, 70);
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

  for (int i = 0; i < sweets.length; i=i+1)
  {
    if (visibleSwts[i]==true)
    {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70);  //4. display the i-th image
      xSwts[i]=xSwts[i]+sSwts[i];
      if ((xSwts[i]>width)||(xSwts[i]<0))
      {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sSwts[i] = random(8, 15);
        } else
        {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    if (visibleOths[i]==true)
    {
      image(otherthings[i], xOths[i], yOths[i], 70, 70);  //4. display the i-th image
      xOths[i]=xOths[i]+sOths[i];
      if ((xOths[i]>width)||(xOths[i]<0))
      {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sOths[i] = random(8, 15);
        } else
        {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

void drawGamePlay1()
{
  image(background, 0, 0);
  bunnies = loadImage("bunnies.png");
  bunny1 = loadImage("bunny1.png");
  image(bunny1, mouseX-35, mouseY-35, 70, 70);
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

  for (int i = 0; i < sweets.length; i=i+1)
  {
    if (visibleSwts[i]==true)
    {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70);  //4. display the i-th image
      xSwts[i]=xSwts[i]+sSwts[i];
      if ((xSwts[i]>width)||(xSwts[i]<0))
      {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sSwts[i] = random(8, 15);
        } else
        {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    if (visibleOths[i]==true)
    {
      image(otherthings[i], xOths[i], yOths[i], 70, 70);  //4. display the i-th image
      xOths[i]=xOths[i]+sOths[i];
      if ((xOths[i]>width)||(xOths[i]<0))
      {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sOths[i] = random(8, 15);
        } else
        {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

void drawGamePlay2() 
{
  image(background, 0, 0);
  bunnies = loadImage("bunnies.png");
  bunny2 = loadImage("bunny2.png");
  image(bunny2, mouseX-35, mouseY-35, 70, 70);
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

  for (int i = 0; i < sweets.length; i=i+1)
  {
    if (visibleSwts[i]==true)
    {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70);  //4. display the i-th image
      xSwts[i]=xSwts[i]+sSwts[i];
      if ((xSwts[i]>width)||(xSwts[i]<0))
      {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sSwts[i] = random(8, 15);
        } else
        {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    if (visibleOths[i]==true)
    {
      image(otherthings[i], xOths[i], yOths[i], 70, 70);  //4. display the i-th image
      xOths[i]=xOths[i]+sOths[i];
      if ((xOths[i]>width)||(xOths[i]<0))
      {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sOths[i] = random(8, 15);
        } else
        {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

void drawGamePlay3()
{
  image(background, 0, 0);
  bunnies = loadImage("bunnies.png");
  bunny3 = loadImage("bunny3.png");
  image(bunny3, mouseX-35, mouseY-35, 70, 70);
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

  for (int i = 0; i < sweets.length; i=i+1)
  {
    if (visibleSwts[i]==true)
    {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70);  //4. display the i-th image
      xSwts[i]=xSwts[i]+sSwts[i];
      if ((xSwts[i]>width)||(xSwts[i]<0))
      {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sSwts[i] = random(8, 15);
        } else
        {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    if (visibleOths[i]==true)
    {
      image(otherthings[i], xOths[i], yOths[i], 70, 70);  //4. display the i-th image
      xOths[i]=xOths[i]+sOths[i];
      if ((xOths[i]>width)||(xOths[i]<0))
      {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sOths[i] = random(8, 15);
        } else
        {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

void drawGamePlay4()
{
  image(background, 0, 0);
  bunnies = loadImage("bunnies.png");
  bunny4 = loadImage("bunny4.png");
  image(bunny4, mouseX-35, mouseY-35, 70, 70);
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

  for (int i = 0; i < sweets.length; i=i+1)
  {
    if (visibleSwts[i]==true)
    {
      image(sweets[i], xSwts[i], ySwts[i], 70, 70);  //4. display the i-th image
      xSwts[i]=xSwts[i]+sSwts[i];
      if ((xSwts[i]>width)||(xSwts[i]<0))
      {
        xSwts[i] = random(-70.0, 770.0);
        ySwts[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sSwts[i] = random(8, 15);
        } else
        {
          sSwts[i] = random(-15, -8);
        }
      }
    }
  }
  for (int i = 0; i < otherthings.length; i=i+1)
  {
    if (visibleOths[i]==true)
    {
      image(otherthings[i], xOths[i], yOths[i], 70, 70);  //4. display the i-th image
      xOths[i]=xOths[i]+sOths[i];
      if ((xOths[i]>width)||(xOths[i]<0))
      {
        xOths[i] = random(-70.0, 770.0);
        yOths[i] = random(76, height);

        if (random(0, 2)<1)
        {
          sOths[i] = random(8, 15);
        } else
        {
          sOths[i] = random(-15, -8);
        }
      }
    }
  }
}

void drawYouWin()
{
  image(background, 0, 0);
  youWin = loadImage("youWin.png");
  image(youWin, 160, 100, 350, 200);
  fill(0);
  textSize(30);
  text("Press 'R' to restart", 200, 320);
  fill(0);
  textSize(30);
  text("Press 'E' to exit", 200, 350);
}

void drawGameOver()
{
  image(background, 0, 0);
  gameOver = loadImage("gameOver.png");
  image(gameOver, 160, 100, 350, 200);
  fill(0);
  textSize(30);
  text("Press 'R' to restart", 200, 320);
  fill(0);
  textSize(30);
  text("Press 'E' to exit", 200, 350);
}