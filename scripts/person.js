export default class Person extends PIXI.AnimatedSprite {
    constructor(app, source, x, y, w, h, speed) {
        let textures = new PIXI.BaseTexture.from(source.src);
        let sheets = {
            'stand': [
                new PIXI.Texture(textures, new PIXI.Rectangle(0, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(1 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(2 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(3 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(4 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(5 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(6 * w, 0, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(7 * w, 0, w, h))
            ],
            'right': [
                new PIXI.Texture(textures, new PIXI.Rectangle(0 * w, h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(1 * w, h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(2 * w, h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(3 * w, h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(4 * w, h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(5 * w, h, w, h)),
            ],
            'left': [
                new PIXI.Texture(textures, new PIXI.Rectangle(0 * w, 2 * h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(2 * w, 2 * h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(4 * w, 2 * h, w, h)),
                new PIXI.Texture(textures, new PIXI.Rectangle(5 * w, 2 * h, w, h)),
            ]

        };
        super(sheets.stand);
        this.keyKod = {};
        this.sheets = sheets;
        this.app = app;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animationSpeed = 0.15;
        this.app.stage.addChild(this);
        window.addEventListener('keydown', (e) => { this.keyKod[e.keyCode] = true});
        window.addEventListener('keyup', (e) => {delete this.keyKod[e.keyCode]; this.textures = this.sheets.stand; this.playAnimation = false; this.play();});
        this.playAnimation = false;
        this.play();
        this.app.ticker.add(this.events.bind(this));
    }

    animate(sheet) {
        setInterval(() => {
            if (sheet.x >= sheet.width * sheet.length) sheet.x = 0;

        });
    }

    events() {
        if(this.keyKod['39']) {
            if(!this.playAnimation) {
                this.playAnimation = true;
                this.textures = this.sheets.right;
                this.play();
            }
            this.x += this.speed;
        }
    }

    // loadSprite() {
    //     this.sheet['stand'] = [
    //         new PIXI.Texture(this.texture, new PIXI.Rectangle(1*this.w, 0, this.w, this.h))
    //     ];
    // }
}