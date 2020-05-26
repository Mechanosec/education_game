import Person from './person.js';

export default class Hero extends Person {

    static _instance;

    /**
     *
     * @param stage
     * @param config
     * @param x
     * @param y
     */
    constructor(stage, config, x, y) {
        super(stage, config, x, y);
        this.temp = 1;
    }

    bumpChecker() {
        if (this.events.length > 0) {
            if (this.stage.collision.checkBump(this, 'Enemy')) {
                this.clearAll();
                this.stage.isAnd = true;
            }
        }
    }

    static getInstance(stage, config, x, y) {
        if (Hero._instance) {
            Hero._instance.stage = stage;
            Hero._instance.stage.addChild(Hero._instance);
            return Hero._instance;
        }
        return Hero._instance = new Hero(stage, config, x, y);
    }
}