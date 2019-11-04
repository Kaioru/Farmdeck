input.onButtonPressed(Button.B, function () {
    flags ^= Flag.Light;
    radio.sendValue("light", (flags & Flag.Light) > 0 ? 1 : 0)
    // basic.showString("Light " + ((flags & Flag.Light) > 0).toString())
})
input.onButtonPressed(Button.AB, function () {
    flags ^= Flag.Pump;
    radio.sendValue("pump", (flags & Flag.Pump) > 0 ? 1 : 0)
    // basic.showString("Pump " + ((flags & Flag.Pump) > 0).toString())
})
input.onGesture(Gesture.ScreenDown, function () {
    flags ^= Flag.Sound;
    radio.sendValue("sound", (flags & Flag.Sound) > 0 ? 1 : 0)
    // basic.showString("Sound is " + ((flags & Flag.Sound) > 0).toString())
})
input.onButtonPressed(Button.A, function () {
    flags ^= Flag.Motor;
    radio.sendValue("motor", (flags & Flag.Motor) > 0 ? 1 : 0)
    // basic.showString("Motor is " + ((flags & Flag.Motor) > 0).toString())
})
let flags = 0
let Flag = {
    Motor: 0x1,
    Light: 0x2,
    Sound: 0x4,
    Pump: 0x8,
}
radio.setGroup(52)

