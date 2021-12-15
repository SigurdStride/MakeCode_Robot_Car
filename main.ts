let currentDistanceLeft = 0
let currentDistanceRight = 0
let direction = "none"

basic.forever(function () {
    if (direction == "right") {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        basic.showArrow(ArrowNames.West)
        basic.pause(50)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(50)
    } else if (direction == "left") {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        basic.showArrow(ArrowNames.East)
        basic.pause(50)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(50)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    }
})

basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) > 10) {
        direction = "none"
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 2550)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 2300)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.pause(100)
        direction = "right"
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
        basic.pause(700)
        direction = "none"
        maqueen.motorStop(maqueen.Motors.All)
        currentDistanceRight = maqueen.Ultrasonic(PingUnit.Centimeters)
        basic.pause(500)
        direction = "left"
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        basic.pause(1400)
        direction = "none"
        maqueen.motorStop(maqueen.Motors.All)
        currentDistanceLeft = maqueen.Ultrasonic(PingUnit.Centimeters)
        basic.pause(500)
        if (currentDistanceLeft > currentDistanceRight || currentDistanceLeft == 0) {
            return;
        } else {
            direction = "right"
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
            basic.pause(1350)
            maqueen.motorStop(maqueen.Motors.All)
            return;
        }
    }
})
