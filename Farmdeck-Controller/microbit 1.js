//Set up
let Temperature = 0
let Light1 = 0
BH1750.on()
BH1750.SetAddress(BH1750_ADDRESS.A35)
// Check if it is working
basic.showString(convertToText(BH1750.getIntensity()))
radio.setGroup(53)
basic.forever(function () {
    Light1 = BH1750.getIntensity()
    Temperature = pins.digitalReadPin(DigitalPin.P0)
    //send over to microbit 2
    radio.sendValue("light2", Light1)
    radio.sendValue("temp", Temperature)
})

