let value1 = 2
let name1 = ""

radio.onReceivedValue(function (name, value) {
    if (name == "pump") {
        value1 = value
        name1 = name
        basic.showNumber(value1)
        if (value < 2) {
            I2C_LCD1602.LcdInit(63)
            I2C_LCD1602.BacklightOff()
            basic.pause(500)
            I2C_LCD1602.on()
            I2C_LCD1602.ShowString("User Activated Pump", 0, 0)
            basic.pause(500)
            I2C_LCD1602.BacklightOn()
            pins.digitalWritePin(DigitalPin.P8, value)
            basic.pause(2000)
        }
    }
})
radio.setGroup(52)
basic.forever(function () {
    basic.showNumber(value1)
    while (value1 == 2) {
        I2C_LCD1602.LcdInit(63)
        I2C_LCD1602.BacklightOff()
        basic.pause(500)
        I2C_LCD1602.on()
        I2C_LCD1602.ShowNumber(pins.analogReadPin(AnalogPin.P1), 0, 0)
        basic.pause(500)
        I2C_LCD1602.BacklightOn()
        pins.digitalWritePin(DigitalPin.P8, 0)
        if (pins.analogReadPin(AnalogPin.P1) > 600) {
            pins.digitalWritePin(DigitalPin.P8, 1)
            basic.pause(2000)
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }
})
