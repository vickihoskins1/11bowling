function X_SCAN () {
    if (input.acceleration(Dimension.X) > -1000 && input.acceleration(Dimension.X) <= -600) {
        X = 0
    } else if (input.acceleration(Dimension.X) > -600 && input.acceleration(Dimension.X) <= -200) {
        X = 1
    } else if (input.acceleration(Dimension.X) > -200 && input.acceleration(Dimension.X) <= 200) {
        X = 2
    } else if (input.acceleration(Dimension.X) > 200 && input.acceleration(Dimension.X) <= 600) {
        X = 3
    } else if (input.acceleration(Dimension.X) > 600 && input.acceleration(Dimension.X) <= 1000) {
        X = 4
    }
    if (Y <= 2) {
        X = 2
        led.plot(X, Y)
    } else {
        if (Y == 3) {
            if (X == 2) {
                led.plot(X, Y)
                led.plot(2, 4)
            }
            if (X < 2) {
                X = 1
                led.plot(X, Y)
                led.plot(0, 4)
            }
            if (X > 2) {
                X = 3
                led.plot(X, Y)
                led.plot(4, 4)
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    GO = 1
})
let P4 = 0
let P3 = 0
let P2 = 0
let P1 = 0
let P0 = 0
let GO = 0
let X = 0
let Y = 0
Y = 0
let P = 0
basic.forever(function () {
    if (input.acceleration(Dimension.Z) > 600 && input.acceleration(Dimension.Z) <= 1000 && Y == 0) {
        music.playTone(262, music.beat(BeatFraction.Half))
        X_SCAN()
        Y = 1
        P0 = X
    }
    if (input.acceleration(Dimension.Z) > 600 && input.acceleration(Dimension.Z) <= 1000 && Y == 1) {
        music.playTone(294, music.beat(BeatFraction.Half))
        X_SCAN()
        Y = 2
        P1 = X
    }
    if (input.acceleration(Dimension.Z) > 200 && input.acceleration(Dimension.Z) <= 600 && Y == 2) {
        music.playTone(330, music.beat(BeatFraction.Half))
        X_SCAN()
        Y = 3
        P2 = X
    }
    if (input.acceleration(Dimension.Z) > -1000 && input.acceleration(Dimension.Z) <= 200 && Y == 3) {
        music.playTone(349, music.beat(BeatFraction.Half))
        X_SCAN()
        Y = 4
        P3 = X
    }
    if (input.acceleration(Dimension.Z) > -1000 && input.acceleration(Dimension.Z) <= 200 && Y == 4) {
        music.playTone(392, music.beat(BeatFraction.Whole))
        X_SCAN()
        Y = 5
        P4 = X
    }
    if (Y == 5) {
        if (GO == 1) {
            basic.showString("go")
            if (P3 > 2) {
                TobbieII.forward()
                basic.pause(500)
                TobbieII.leftward()
                basic.showLeds(`
                    # . . . .
                    . # . . #
                    . . # . #
                    . . . # #
                    . # # # #
                    `)
                TobbieII.stopturn()
                for (let index = 0; index < 4; index++) {
                    basic.pause(2000)
                }
                TobbieII.stopwalk()
                basic.showIcon(IconNames.Sad)
                music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
            }
            if (P3 < 2) {
                TobbieII.forward()
                basic.pause(500)
                TobbieII.rightward()
                basic.showLeds(`
                    . . . . #
                    # . . # .
                    # . # . .
                    # # . . .
                    # # # # .
                    `)
                TobbieII.stopturn()
                for (let index = 0; index < 5; index++) {
                    basic.pause(2000)
                }
                TobbieII.stopwalk()
                basic.showIcon(IconNames.Sad)
                music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
            }
            if (P3 == 2) {
                TobbieII.forward()
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
                for (let index = 0; index < 5; index++) {
                    basic.pause(2000)
                }
                TobbieII.stopwalk()
                basic.showIcon(IconNames.Happy)
                music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
            }
            GO = 0
        }
    }
})
