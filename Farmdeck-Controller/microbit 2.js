/**
 * 0 - off 1 - on 2 - auto
 */
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
    } else if (name == "mp3") {
        if (value == 0) {
            mp3 = 0
            basic.showIcon(IconNames.No)
        } else if (value == 1) {
            mp3 = 1
            basic.showIcon(IconNames.Yes)
        } else {
            mp3 = 2
            basic.showIcon(IconNames.Giraffe)
        }
    } else if (name == "light") {
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
        light2 = value
    }
})
let light2 = 0
let motor = 0
let mp3 = 0
let light = 0
light = 2
mp3 = 2
motor = 2
radio.setGroup(52)
// Turn on Light Sensor
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
// Check if it is working
basic.showString(convertToText(BH1750.getIntensity()))
// Set Mp3 Player
dfplayer.MP3_setSerial(SerialPin.P14, SerialPin.P15)
dfplayer.setLoop()
dfplayer.setVolume(30)
basic.forever(function () {
    if (mp3 == 0) {
        dfplayer.execute(
            dfplayer.playType.type5
        )
    } else if (mp3 == 1 || mp3 == 2) {
        dfplayer.execute(
            dfplayer.playType.type1
        )
        dfplayer.setVolume(pins.map(
            1000 - BH1750.getIntensity(),
            0,
            1000,
            0,
            30
        ))
    }
    if (light == 0) {
        robotbit.rgb().showColor(neopixel.hsl(174, 72, 0))
    } else if (light == 1) {
        // Change color on user press
        robotbit.rgb().showColor(neopixel.hsl(174, 72, 255))
    } else {
        robotbit.rgb().showColor(neopixel.hsl(174, 72, pins.map(
            1000 - ((BH1750.getIntensity() + light2) / 2),
            0,
            1000,
            0,
            100
        )))
    }
    if (motor == 0) {
        robotbit.Servo(robotbit.Servos.S1, 0)
    } else if (motor == 1) {
        robotbit.Servo(robotbit.Servos.S1, 90)
    } else {
        if (BH1750.getIntensity() > light2) {
            robotbit.Servo(robotbit.Servos.S1, 90)
        } else if (BH1750.getIntensity() < light2) {
            robotbit.Servo(robotbit.Servos.S1, 270)
        } else {
            robotbit.Servo(robotbit.Servos.S1, 0)
        }
    }
})
