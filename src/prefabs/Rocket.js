// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y, texture, frame, keyL, keyR, keyF) {
                super(scene, x, y, texture, frame);
                // add object to existing scene
                scene.add.existing(this);
                this.isFiring = false;
                this.moveSpeed = 0.5;
                this.keyLft = keyL;
                this.keyRht = keyR;
                this.keyFire = keyF;

                this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        }

        update() {
                // left&right movement
                if (!this.isFiring || this.isFiring) {
                        if (this.keyLft.isDown && this.x >= borderUISize + this.width) {
                                this.x -= this.moveSpeed;
                        } else if (this.keyRht.isDown && this.x <= game.config.width - borderUISize - this.width) {
                                this.x += this.moveSpeed;
                        }
                }

                // fire button
                if (Phaser.Input.Keyboard.JustDown(this.keyFire) && !this.isFiring) {
                        this.isFiring = true;
                        this.sfxRocket.play();  // play sfx
                }
                // if fired, move up
                if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                        this.y -= this.moveSpeed;
                }
                // reset on miss
                if (this.y <= borderUISize * 3 + borderPadding) {
                        this.reset();
                }
        }

        // reset rocket to "ground"
        reset() {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
        }
}