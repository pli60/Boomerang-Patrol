class Menu extends Phaser.Scene {
        constructor(){
                super("menuScene");
        }

        preload() {
                // load audio
                this.load.audio('sfx_select', './assets/select.wav');
                this.load.audio('sfx_explosion', './assets/knockdown.wav');
                this.load.audio('sfx_rocket', './assets/throw.wav');
        }

        create(){
                // menu text config
                let menuConfig = {
                        fontFamily: 'Courier',
                        fontSize: '28px',
                        backgroundColor: '#bfba75',
                        color: '#843605',
                        align: 'right',
                        padding: {
                                top: 5,
                                bottom: 5,
                        },
                        fixedWidth: 0
                }

                // show menu text
                this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move & F to fire', menuConfig).setOrigin(0.5);
                menuConfig.backgroundColor = '#bf8975';
                menuConfig.color = '#000';
                this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

                // define keys
                keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        }

        update() {
                if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                        // easy mode
                        game.settings = {
                                spaceshipSpeed: 0.5,
                                gameTimer: 60000
                        }
                        this.sound.play('sfx_select');
                        this.scene.start('playScene');
                }
                if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                        // hard mode
                        game.settings = {
                                spaceshipSpeed: 2,
                                gameTimer: 45000
                        }
                        this.sound.play('sfx_select');
                        this.scene.start('playScene');
                }
        }
}