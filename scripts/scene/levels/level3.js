import GameLevel from "../gameLevel.js";
import Enemy from "../../classes/enemy.js";
import {config as enemyConfig} from "../../../source/enemy.js";

export default class Level1 extends GameLevel{
    constructor() {
        super();
        let enemy = new Enemy(this, enemyConfig, 5*80, 94);
    }
}