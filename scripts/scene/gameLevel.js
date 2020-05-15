import Collision from "./collision.js";

export default class GameLevel extends PIXI.Container {
    constructor() {
        super();
        this.mainPerson = {};
        this.collision = new Collision();
        this.ticker = new PIXI.Ticker();
        this.ticker.start();
        this.isAnd = false;
        this.isDead = false;
        this.addChild(this.initGround()); //добавление заднего фона в сцену
        this.view = {
            'width': this.width - 1,
            'height': this.height - 1
        };
    }

    /**
     * инициализация заднего фона приложения(искуственная визуализация чанков)
     * @returns {Graphics}
     */
    initGround() {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(1);
        for (let j = 0; j < 14; j++) {
            for (let i = 0; i < 16; i++) {
                if (j == 1 && i == 1) {
                    rectangle.beginFill(0xFF3300);
                    rectangle.drawRect(i * 80, j * 94, 80, 47);
                    rectangle.endFill();
                } else {
                    rectangle.drawRect(i * 80, j * 47, 80, 47);
                }
            }
        }
        return rectangle;
    }

}