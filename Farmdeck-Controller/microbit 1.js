let Temperature = 0
let Light1 = 0
let mp3 = 0
dfplayer.MP3_setSerial(SerialPin.P0, SerialPin.P1)
dfplayer.setVolume(10)
dfplayer.setLoop()
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
radio.setGroup(52)
basic.showIcon(IconNames.Yes)
mp3 = 2
basic.forever(function () {
    Light1 = BH1750.getIntensity()
    Temperature = pins.digitalReadPin(DigitalPin.P0)
    // send over to microbit 2
    radio.sendValue("light2", Light1)
    radio.sendValue("temp", Temperature)
    
    dfplayer.setVolume(pins.map(
        1000 - BH1750.getIntensity(),
        0,
        1000,
        0,
        30
    ))
    // Check if it is working
    basic.showString(convertToText(BH1750.getIntensity()))
    robotbit.rgb().showColor(neopixel.hsl(174, 72, pins.map(
        1000 - BH1750.getIntensity(),
        0,
        1000,
        0,
        100
    )))
})
