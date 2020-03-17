export default class Person extends PIXI.AnimatedSprite {
    constructor(app, config, x, y) {
        super(config.sheets.stand);

        this.app = app;
        this.sheets = config.sheets;
        this.width = config.width;
        this.height = config.height;
        this.speed = config.speed;

        this.anchor.set(0.5);
        this.x = (x + 1) * this.width / 2;
        this.y = (y + 1) * this.height / 2;

        this.animationSpeed = 0.15;
        this.event = '';
        this.moveTo = 0;

        this.app.stage.addChild(this);
        this.playAnimation = false;
        this.play();
    }

    animate(spriteName) {
        if (!this.playAnimation) {
            this.playAnimation = true;
            this.textures = this.sheets[spriteName];
            this.play();
        }
    }
}