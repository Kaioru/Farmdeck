radio.onReceivedValue(function (name, value) {
    if (name == "motor") {
        if (value == 0) {
            motor = 0
            basic.showIcon(IconNames.No)
        } else if (value == 1) {
            motor = 1
            basic.showIcon(IconNames.Yes)
        } else {
            motor = 2
            basic.showIcon(IconNames.Giraffe)
        }
    }  else if (name == "light") {
        if (value == 0) {
            light = 0
            basic.showIcon(IconNames.No)
        } else if (value == 1) {
            light = 1
            basic.showIcon(IconNames.Yes)
        } else {
            light = 2
            basic.showIcon(IconNames.Giraffe)
        }
    } else if (name == "light2") {
        avglight = (BH1750.getIntensity() + value) / 2
        if (BH1750.getIntensity() < value && value > 500) {
            light2 = 180
        } else if (BH1750.getIntensity() > value && BH1750.getIntensity() > 500) {
            light2 = 0
        } else {
            light2 = 90
        }
    }
})
/**
 * 0 - off 1 - on 2 - auto
 */
let avglight = 0
let motor = 0
let light = 0
let light2 = 0
light = 2
motor = 2
radio.setGroup(52)
// Turn on Light Sensor
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
// Check if it is working
basic.showString(convertToText(BH1750.getIntensity()))
robotbit.Servo(robotbit.Servos.S1, 90)
basic.forever(function () {
    if (light == 0) {
        robotbit.rgb().showColor(neopixel.hsl(174, 72, 0))
    } else if (light == 1) {
        // Change color on user press
        robotbit.rgb().showColor(neopixel.hsl(174, 72, 255))
    } else {
        robotbit.rgb().showColor(neopixel.hsl(174, 72, pins.map(
        1000 - avglight,
        0,
        1000,
        0,
        100
        )))
    }
    if (motor == 0) {
        robotbit.Servo(robotbit.Servos.S1, 0)
    } else if (motor == 1) {
        robotbit.Servo(robotbit.Servos.S1, 180)
    } else {
        robotbit.Servo(robotbit.Servos.S1, light2)
    }
    radio.sendValue("light", avglight)
    basic.pause(2000)
})
