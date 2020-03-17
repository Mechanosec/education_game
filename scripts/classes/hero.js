import Person from './person.js';

export default class Hero extends Person {

    constructor(app, config, x, y) {
        super(app, config, x, y);

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
            this.animate('walk');
            this.x += this.speed;
            if (this.x >= this.moveTo) {
                this.event = '';
                this.stand();
            }
        }
        if (this.event == 'left') {
            this.animate('walk');
            this.x -= this.speed;
            if (this.x <= this.moveTo) {
                this.event = '';
                this.stand();
            }
        }
    }
}