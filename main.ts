/// move left or right with button press
input.onButtonPressed(Button.A, function () {
    if (gameOver == 1) {
        charPos += -1
        if (charPos < 0) {
            charPos = 0
        }
        led.unplot(charPos + 1, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (gameOver == 1) {
        charPos += 1
        if (charPos > 4) {
            charPos = 4
        }
        led.unplot(charPos - 1, 4)
    }
})
/// defining of variables and setting of brightness
let lvlSelect = 1
/// challnegeLvl 2.1 works nicely
let challengeLvl = 2
let score = 0
let charPos = 2
let sprPosX
let sprPosY
let life = 3
let ramping = 2000 / challengeLvl
let bright = 255
let thisIsScore = 1
let gameOver = 1
let restart = 1
led.setBrightness(bright)
/// game over
basic.forever(function () {
    if (life < 1 && bright >= 0) {
        gameOver = 0
        led.setBrightness(bright)
        bright = bright - 20
        led.toggleAll()
        pause(100)
    }
})
/// score showing
basic.forever(function () {
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
/// drawing of character
basic.forever(function () {
    if (gameOver == 1) {
        led.plot(charPos, 4)
    }
})
/// drawing of coin, score giving/life taking, and difficulty ramping
basic.forever(function () {
    if (life > 0) {
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
input.onGesture(Gesture.Shake, function () {
    if (restart == 0) {
        score = 0
        charPos = 2
        life = 3
        ramping = 1000
        bright = 255
        thisIsScore = 1
        gameOver = 1
        restart = 1
    }
})