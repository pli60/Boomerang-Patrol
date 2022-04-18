let config = {
        type: Phaser.CANVAS,
        width: 640,
        height: 480,
        scene: [ Menu, Play ],
        backgroundColor: 0x9F4A54
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keySpace;


// Points Breakdown
// 60 - Redesigned the game's artwork, UI, and sound to a wild west theme. 
//      For instance: changed rocket to boomerang, changed ship to cowboy, changed tile to desert, changed all SFX, and tweaked UI.     All selfmade art using Aseprite*

// 30 - Implement a simultaneous two-player mode.
//      Added a second Boomerang which is controlled using 'a' and 'd', and fire using spacebar.

// 5 - Add copyright free background music to play scene.
//      Added wild west themed copyright free background music.

// 5 - Allow the player to control the Rocket after it's fired.
//      Now player can control both Boomerang even after they are fired.
