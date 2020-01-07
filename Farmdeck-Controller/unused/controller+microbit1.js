input.onButtonPressed(Button.A, function () {
    flags ^= Flag.Motor;
radio.sendValue("motor", counta)
    basic.showString("A")
    if (counta < 2) {
        counta += 1
    } else {
        counta = 0
    }
})
input.onGesture(Gesture.ScreenDown, function () {
    let counts = 0
    flags ^= Flag.Sound;
radio.sendValue("sound", counts)
    basic.showString("S")
    if (countab < 2) {
        countab += 1
    } else {
        countab = 0
    }
})
IFTTT_MQTT_Weather.Obloq_mqtt_callback_user(function (message) {
    let split = message.split('-')
component = split[0]
    state = split[1]
    setComponentState(component, parseInt(state))
})
radio.onReceivedValue(function (name, value) {
    if (name == "mp3") {
        if (value == 0) {
            dfplayer.setVolume(0)
        } else if (value == 1) {
            dfplayer.setVolume(30)
        } else if (value == 2) {
            dfplayer.setVolume(pins.map(
            1000 - finalight,
            0,
            1000,
            0,
            30
            ))
        }
    } else if (name == "light") {
        finalight = value
    }
})
function setComponentState (component: string, state: number) {
    radio.sendValue(component, state)
}
input.onButtonPressed(Button.AB, function () {
    flags ^= Flag.Pump;
radio.sendValue("pump", countab)
    basic.showNumber(countab)
    if (countab < 2) {
        countab += 1
    } else {
        countab = 0
    }
})
input.onButtonPressed(Button.B, function () {
    flags ^= Flag.Light;
radio.sendValue("light", countb)
    basic.showString("B")
    if (countb < 2) {
        countb += 1
    } else {
        countb = 0
    }
})
let Temperature = 0
let Light1 = 0
let countb = 0
let state = ""
let component = ""
let countab = 0
let counta = 0
let finalight = 0
let flags = 0
IFTTT_MQTT_Weather.WIFI_setup(
SerialPin.P14,
SerialPin.P15,
"TP-LINK_3AED",
"20858802"
)
IFTTT_MQTT_Weather.Obloq_mqtt_setup(
    "xatwrqxo",
    "7mJGK1UtD1-S",
    "panel",
    IFTTT_MQTT_Weather.SERVERS.China
)
let Flag = {
    Motor: 0x1,
    Light: 0x2,
    Sound: 0x4,
    Pump: 0x8,
}
radio.setGroup(52)
finalight = BH1750.getIntensity()
dfplayer.MP3_setSerial(SerialPin.P0, SerialPin.P1)
dfplayer.setVolume(30)
dfplayer.setLoop()
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
radio.setGroup(52)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    Light1 = BH1750.getIntensity()
    Temperature = pins.digitalReadPin(DigitalPin.P0)
    // send over to microbit 2
    radio.sendValue("light2", Light1)
    radio.sendValue("temp", Temperature)
    dfplayer.setVolume(pins.map(
    1000 - finalight,
    0,
    1000,
    0,
    30
    ))
    // Check if it is working
    basic.showString(convertToText(finalight))
    robotbit.rgb().showColor(neopixel.hsl(174, 72, pins.map(
    1000 - finalight,
    0,
    1000,
    0,
    100
    )))
    basic.pause(2000)
})
