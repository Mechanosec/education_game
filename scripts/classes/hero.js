import Person from './person.js';

export default class Hero extends Person {

    constructor(app, config, x, y) {
        super(app, config, x, y);

        this.app.ticker.add(this.myLoop.bind(this));
    }

    stand() {
        this.textures = this.sheets.stand;
        this.playAnimation = false;
        this.play();
    }

    calcMoveToX() {
        let currentX = 0;
        if(this.moveToX.length > 0) {
            currentX = this.moveToX[this.moveToX.length - 1];
        } else {
            currentX = this.x != 0 ? this.x : 1;
        }
        return currentX;
    }
    calcMoveToY() {
        let currentY = 0;
        if(this.moveToY.length > 0) {
            currentY = this.moveToY[this.moveToY.length - 1];
        } else {
            currentY = this.y != 0 ? this.y : 1;
        }
        return currentY;
    }

    right() {
        let currentX = this.calcMoveToX();
        this.moveToX.push(currentX + (this.step * this.width));
        this.scale.x = 1;
        this.events.push('right');
    }

    left() {
        let currentX = this.calcMoveToX();
        this.moveToX.push(currentX - (this.step * this.width));
        this.scale.x = -1;
        this.events.push('left');
    }

    down() {
        let currentY = this.calcMoveToY();
        this.moveToY.push(currentY + (this.step * this.height));
        this.scale.x = 1;
        this.events.push('down');
    }


    myLoop() {
        // console.log(this.events);
        if (this.events.length > 0 && this.events[0] == 'right') {
            this.animate('walk');
            this.x += this.speed;
            if (this.x >= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
                // this.stand();
            }
        } else if (this.events.length > 0 && this.events[0] == 'left') {
            this.animate('walk');
            this.x -= this.speed;
            if (this.x <= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
                // this.stand();
            }
        } else if(this.events.length > 0 && this.events[0] == 'down') {
            console.log(123);
            this.animate('walk');
            this.y += this.speed;
            if (this.y >= this.moveToY[0]) {
                this.y = this.moveToY[0];
                this.events.shift();
                this.moveToY.shift();
                // this.stand();
            }
        }

        if (this.events.length == 0) {
            this.stand();
        }
    }
}