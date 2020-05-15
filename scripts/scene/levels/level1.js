import GameLevel from "../gameLevel.js";
import Enemy from "../../classes/enemy.js";
import {config as enemyConfig} from "../../../source/enemy.js";
import Hero from "../../classes/hero.js";
import {config as heroConfig} from "../../../source/hero.js";


export default class Level1 extends GameLevel{
    constructor() {
        super();
        let enemy = new Enemy(this, enemyConfig, 5*80, 0);
        this.mainPerson = new Hero(this, heroConfig, 0, 0);
    }
}