export default class Person extends PIXI.AnimatedSprite {
    constructor(app, config, x, y) {
        super(config.sheets.stand);

        this.app = app;
        this.sheets = config.sheets;
        this.width = config.width;
        this.height = config.height;
        this.speed = config.speed;

        this.anchor.set(0.5);
        this.x = (x+1)*this.width/2;
        this.y = (y+1)*this.height/2;

        this.animationSpeed = 0.15;
        this.event = '';
        this.moveTo = 0;

        this.app.stage.addChild(this);
        this.playAnimation = false;
        this.play();
        this.app.ticker.add(this.events.bind(this));
    }

    stand() {
        this.textures = this.sheets.stand;
        this.playAnimation = false;
        this.play();
    }

    right(steps) {
        let currentX = this.x != 0 ? this.x : 1;
        this.moveTo = currentX + (steps * this.width);
        this.scale.x = 1;
        this.event = 'right';
    }

    left(steps) {
        let currentX = this.x != 0 ? this.x : 1;
        this.moveTo = currentX - (steps * this.width);
        this.scale.x = -1;
        this.event = 'left';
    }

    events() {
        if (this.event == 'right') {
            if (!this.playAnimation) {
                this.playAnimation = true;
                this.textures = this.sheets.walk;
                this.play();
            }
            this.x += this.speed;
            if (this.x > this.moveTo) {
                this.event = '';
                this.stand();
            }
        }
        if (this.event == 'left') {
            if (!this.playAnimation) {
                this.playAnimation = true;
                this.textures = this.sheets.walk;
                this.play();
            }
            this.x -= this.speed;
            if (this.x < this.moveTo) {
                this.event = '';
                this.stand();
            }
        }
    }
}