radio.onReceivedValue(function (name, value) {
    if (name == "mp3") {
        if (value == 0) {
            dfplayer.setVolume(0)
        } else if (value == 1) {
            dfplayer.setVolume(30)
        } else if (value == 2) {
            dfplayer.setVolume(pins.map(
            2000 - finalight,
            0,
            2000,
            0,
            30
            ))
        }
    } else if (name == "avglight") {
        finalight = value
        basic.showIcon(IconNames.Yes)
    }
})
let Temperature = 0
let Light1 = 0
let finalight = 0
dfplayer.MP3_setSerial(SerialPin.P0, SerialPin.P1)
dfplayer.setVolume(30)
dfplayer.setLoop()
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
radio.setGroup(52)
finalight = BH1750.getIntensity()
basic.showIcon(IconNames.Yes)
dht11_dht22.queryData(
DHTtype.DHT22,
DigitalPin.P13,
true,
false,
true
)
basic.forever(function () {
    Light1 = BH1750.getIntensity()
    Temperature = dht11_dht22.readData(dataType.temperature)
    basic.showString("" + Temperature)
    // send over to microbit 2
    radio.sendValue("light2", Light1)
    // send over to microbit 2
    radio.sendValue("temp", Temperature)
    // Check if it is working basic.showString("" +
    // Math.ceil(Math.map(2000 - finalight, 0, 2000, 0,
    // 30)))
    dfplayer.setVolume(Math.ceil(Math.map(2000 - finalight, 0, 2000, 0, 30)))
    robotbit.rgb().showColor(neopixel.hsl(174, 72, pins.map(
    1000 - finalight,
    0,
    1000,
    0,
    100
    )))
    basic.pause(2000)
})
