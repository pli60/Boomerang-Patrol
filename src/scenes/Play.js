class Play extends Phaser.Scene {
        constructor(){
                super("playScene");
        }
        
        preload() {
                // load images/tile sprites
                this.load.image('rocket', './assets/rocket.png');
                this.load.image('spaceship', './assets/spaceship.png');
                this.load.image('starfield', './assets/starfield.png');
                this.load.image('boomerang', './assets/boomerang.png');
                this.load.image('desert', './assets/desert.png');
                this.load.image('horse', './assets/horse.png');

                // load music
                this.load.audio('music', './assets/wild west.mp3');

                // load explosion spritesheet
                this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
              }
        
        create() {
                // play background music
                var BGmusic = this.sound.add('music');
                BGmusic.play();

                // animation config
                this.anims.create({
                        key: 'explode',
                        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
                        frameRate: 30
                });

                // place tile sprite
                this.starfield = this.add.tileSprite(0, 0, 640, 480, 'desert').setOrigin(0, 0);

                // white borders
                this.add.rectangle(0, 0, game.config.width, borderUISize, 0xD0D1AC).setOrigin(0, 0);
                this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xD0D1AC).setOrigin(0, 0);
                this.add.rectangle(0, 0, borderUISize, game.config.height, 0xD0D1AC).setOrigin(0, 0);
                this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xD0D1AC).setOrigin(0, 0);

                // define keys
                keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
                keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
                keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
                keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

                // add rocket (p1)
                this.p1Rocket = new Rocket(this, game.config.width / 2 + 40, game.config.height - borderUISize - borderPadding, 'boomerang', 0, keyLEFT, keyRIGHT, keyF).setOrigin(0.5, 0);
                this.p2Rocket = new Rocket(this, game.config.width / 2 - 40, game.config.height - borderUISize - borderPadding, 'boomerang', 0, keyA, keyD, keySpace).setOrigin(0.5, 0);

                // add spaceships (x3)
                this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'horse', 0, 30).setOrigin(0, 0);
                this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'horse', 0, 20).setOrigin(0,0);
                this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'horse', 0, 10).setOrigin(0,0);

                // initialize score
                this.p1Score = 0;
                // display score
                let scoreConfig = {
                        fontFamily: 'Courier',
                        fontSize: '28px',
                        backgroundColor: '#DDE0BD',
                        color: '#843605',
                        align: 'right',
                        padding: {
                                top: 5,
                                bottom: 5,
                        },
                        fixedWidth: 100
                }
                this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
                
                // GAME OVER flag
                this.gameOver = false;
                // 60-second play clock
                scoreConfig.fixedWidth = 0;
                this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
                        this.gameOver = true;
                        BGmusic.stop();
                }, null, this);
        }

        update() {
                // check key input for restart
                if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                        this.scene.restart();
                }

                if (!this.gameOver) {
                        this.starfield.tilePositionX -= 4;
                        this.p1Rocket.update();
                        this.p2Rocket.update();
                        this.ship01.update();           // update spaceships (x3)
                        this.ship02.update();
                        this.ship03.update();
                }

                // check collisions
                if(this.checkCollision(this.p1Rocket, this.ship03)) {
                        this.p1Rocket.reset();
                        this.shipExplode(this.ship03); 
                }
                if (this.checkCollision(this.p1Rocket, this.ship02)) {
                        this.p1Rocket.reset();
                        this.shipExplode(this.ship02); 
                }
                if (this.checkCollision(this.p1Rocket, this.ship01)) {
                        this.p1Rocket.reset();
                        this.shipExplode(this.ship01); 
                }
                if(this.checkCollision(this.p2Rocket, this.ship03)) {
                        this.p2Rocket.reset();
                        this.shipExplode(this.ship03); 
                }
                if (this.checkCollision(this.p2Rocket, this.ship02)) {
                        this.p2Rocket.reset();
                        this.shipExplode(this.ship02); 
                }
                if (this.checkCollision(this.p2Rocket, this.ship01)) {
                        this.p2Rocket.reset();
                        this.shipExplode(this.ship01); 
                }
                if (!this.gameOver) {
                        this.p1Rocket.update();         // update rocket sprite
                        this.p2Rocket.update();
                        this.ship01.update();           // update spaceships (x3)
                        this.ship02.update();
                        this.ship03.update();
                }
                if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                        this.scene.start("menuScene");
                }
        }

        checkCollision(rocket, ship) {
                // simple AABB checking
                if (rocket.x < ship.x + ship.width && 
                    rocket.x + rocket.width > ship.x && 
                    rocket.y < ship.y + ship.height &&
                    rocket.height + rocket.y > ship. y) {
                        return true;
                } else {
                    return false;
                }
            }
        
        shipExplode(ship) {
                // temporarily hide ship
                ship.alpha = 0;
                // create explosion sprite at ship's position
                let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
                boom.anims.play('explode');             // play explode animation
                boom.on('animationcomplete', () => {    // callback after anim completes
                        ship.reset();                         // reset ship position
                        ship.alpha = 1;                       // make ship visible again
                        boom.destroy();                       // remove explosion sprite
                });
                // score add and repaint
                this.p1Score += ship.points;
                this.scoreLeft.text = this.p1Score;
                // play sound
                this.sound.play('sfx_explosion');
        }
}