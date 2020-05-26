import GameLevel from "../gameLevel.js";
import Enemy from "../../classes/enemy.js";
import {config as enemyConfig} from "../../../source/enemy.js";


export default class Level1 extends GameLevel {
    constructor() {
        super();
        let enemy = new Enemy(this, enemyConfig, 5 * 80, 0);
        let enemy1 = new Enemy(this, enemyConfig, 5 * 80, 0);
        this.hero.setPosition(2, 1);
        this.hero.temp = 0;
        console.log(this.collision)
    }

}