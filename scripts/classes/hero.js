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
        if (this.moveToX.length > 0) {
            currentX = this.moveToX[this.moveToX.length - 1];
        } else {
            currentX = this.x != 0 ? this.x : 1;
        }
        return currentX;
    }

    calcMoveToY() {
        let currentY = 0;
        if (this.moveToY.length > 0) {
            currentY = this.moveToY[this.moveToY.length - 1];
        } else {
            currentY = this.y != 0 ? this.y : 1;
        }
        return currentY;
    }

    right() {
        let currentX = this.calcMoveToX();
        if (currentX < this.app.stage.width - (this.width / 2) - 1) {
            this.scale.x = 1;
            this.moveToX.push(currentX + (this.step * this.width));
            this.events.push('right');
        }
    }

    left() {
        let currentX = this.calcMoveToX();
        if (currentX > (this.width / 2) + 1) {
            this.scale.x = -1;
            this.moveToX.push(currentX - (this.step * this.width));
            this.events.push('left');
        }
    }

    down() {
        let currentY = this.calcMoveToY();
        if (currentY < this.app.stage.height - (this.height / 2) - 1) {
            this.scale.x = 1;
            this.moveToY.push(currentY + (this.step * this.height));
            this.events.push('down');
        }

    }

    up() {
        let currentY = this.calcMoveToY();
        if (currentY > (this.height / 2) + 1) {
            this.scale.x = 1;
            this.moveToY.push(currentY - (this.step * this.height));
            this.events.push('up');
        }

    }


    myLoop() {
        if (this.events.length > 0 && this.events[0] == 'right') {
            this.animate('walk');
            this.x += this.speed;
            if (this.x >= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
            }
        } else if (this.events.length > 0 && this.events[0] == 'left') {
            this.animate('walk');
            this.x -= this.speed;
            if (this.x <= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
            }
        } else if (this.events.length > 0 && this.events[0] == 'down') {
            this.animate('walk');
            this.y += this.speed;
            if (this.y >= this.moveToY[0]) {
                this.y = this.moveToY[0];
                this.events.shift();
                this.moveToY.shift();
            }
        } else if (this.events.length > 0 && this.events[0] == 'up') {
            this.animate('walk');
            this.y -= this.speed;
            if (this.y <= this.moveToY[0]) {
                this.y = this.moveToY[0];
                this.events.shift();
                this.moveToY.shift();
            }
        } else if (this.events.length == 0 && this.playAnimation == true) {
            this.stand();
        }
    }
}