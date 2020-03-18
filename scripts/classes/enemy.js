import Person from './person.js';

export default class Enemy extends Person {

    /**
     * @param app
     * @param config
     * @param x
     * @param y
     */
    constructor(app, config, x, y) {
        super(app, config, x, y);
    }
}