/// move left or right with button press
input.onButtonPressed(Button.A, function () {
    if (gameOver == 1 && start == 1) {
        charPos += -1
        if (charPos < 0) {
            charPos = 0
        }
        led.unplot(charPos + 1, 4)
    } 
    /// start
    else if (start==0) {
        lvlSelect = lvlSelect + 1
        if (lvlSelect > 3) {
            lvlSelect = 1
      }
    }
})
input.onButtonPressed(Button.B, function () {
    if (gameOver == 1 && start==1) {
        charPos += 1
        if (charPos > 4) {
            charPos = 4
        }
        led.unplot(charPos - 1, 4)
    }
})
/// choose level
input.onButtonPressed(Button.AB, function () {
    if(start==0) {
        basic.clearScreen()
        ramping = 2000 / challengeLvl
        start = 1
        }
})
/// helps define ramping, shows challenge level at start, flashing lights at game over, and score showing
basic.forever(function () {
    if (lvlSelect==1) {
        challengeLvl=1.9
    } else if(lvlSelect==2) {
        challengeLvl=2
    } else if(lvlSelect==3) {
        challengeLvl=2.1
    }
    if (start == 0) {
        basic.showNumber(lvlSelect)
    }
    if (life < 1 && bright >= 0) {
        gameOver = 0
        led.setBrightness(bright)
        bright = bright - 20
        led.toggleAll()
        pause(100)
    }
    if (life < 1 && bright <= 0 && thisIsScore == 1) {
        pause(20)
        basic.clearScreen()
        led.setBrightness(255)
        basic.showNumber(score)
        pause(5000)
        thisIsScore = 0
        basic.clearScreen()
        restart = 0
    }
})
/// defining of variables and setting of brightness
let lvlSelect = 1
let challengeLvl = 2
let start = 0
let score = 0
let charPos = 2
let sprPosX
let sprPosY
let life = 3
let ramping = 1000
let bright = 255
let thisIsScore = 1
let gameOver = 1
let restart = 1
led.setBrightness(bright)
/// score showing
/// drawing of character
basic.forever(function () {
    if (gameOver == 1 &&start==1) {
        led.plot(charPos, 4)
    }
})
/// drawing of coin, score giving/life taking, and difficulty ramping
basic.forever(function () {
    if (life > 0 && start ==1) {
        basic.pause(ramping)
        sprPosX = randint(0, 4)
        sprPosY = 0
        led.plot(sprPosX, sprPosY)
        basic.pause(ramping)
        led.unplot(sprPosX, sprPosY)
        sprPosY = sprPosY += 1
        led.plot(sprPosX, sprPosY)
        basic.pause(ramping)
        led.unplot(sprPosX, sprPosY)
        sprPosY = sprPosY += 1
        led.plot(sprPosX, sprPosY)
        basic.pause(ramping)
        led.unplot(sprPosX, sprPosY)
        sprPosY = sprPosY += 1
        led.plot(sprPosX, sprPosY)
        basic.pause(ramping / 3)
        led.unplot(sprPosX, sprPosY)
        if (charPos == sprPosX) {
            ramping = ramping / (challengeLvl * 0.52)
            score = score + 1
        } else {
            life = life - 1
        }
    }
})
/// restart
input.onGesture(Gesture.Shake, function () {
    if (restart == 0) {
        score = 0
        gameOver=1
        charPos = 2
        life = 3
        ramping = 1000
        bright = 255
        thisIsScore = 1
        basic.clearScreen()
        restart = 1
        start =0
    }
})