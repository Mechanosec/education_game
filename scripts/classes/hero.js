import Person from './person.js';

export default class Hero extends Person {

    /**
     *
     * @param app
     * @param config
     * @param x
     * @param y
     */
    constructor(app, config, x, y) {
        super(app, config, x, y);

        this.app.ticker.add(this.myLoop.bind(this));
    }

    /**
     * расчет текущего положения персонажа по оси X
     * @returns int
     */
    calcMoveToX() {
        let currentX = 0;
        if (this.moveToX.length > 0) {
            currentX = this.moveToX[this.moveToX.length - 1];
        } else {
            currentX = this.x != 0 ? this.x : 1;
        }
        return currentX;
    }

    /**
     * расчет текущего положения персонажа по оси Y
     * @returns int
     */
    calcMoveToY() {
        let currentY = 0;
        if (this.moveToY.length > 0) {
            currentY = this.moveToY[this.moveToY.length - 1];
        } else {
            currentY = this.y != 0 ? this.y : 1;
        }
        return currentY;
    }

    /**
     * состояние покоя
     */
    stand() {
        this.textures = this.sheets.stand;
        this.playAnimation = false;
        this.play();
    }

    /**
     * состояние движения вправо
     */
    right() {
        let currentX = this.calcMoveToX();
        if (currentX < this.app.view.width - (this.width / 2)) { //проверка на край приложения
            this.scale.x = 1;
            this.moveToX.push(currentX + (this.step * this.width));
            this.events.push('right');
        }
    }

    /**
     * состояние движения влево
     */
    left() {
        let currentX = this.calcMoveToX();
        if (currentX > (this.width / 2)) { //проверка на край приложения
            this.scale.x = -1;
            this.moveToX.push(currentX - (this.step * this.width));
            this.events.push('left');
        }
    }

    /**
     * состояние движения вниз
     */
    down() {
        let currentY = this.calcMoveToY();
        if (currentY < this.app.view.height - (this.height / 2)) { //проверка на край приложения
            this.scale.x = 1;
            this.moveToY.push(currentY + (this.step * this.height));
            this.events.push('down');
        }

    }

    /**
     * состояние движения вверх
     */
    up() {
        let currentY = this.calcMoveToY();
        if (currentY > (this.height / 2)) { //проверка на край приложения
            this.scale.x = 1;
            this.moveToY.push(currentY - (this.step * this.height));
            this.events.push('up');
        }

    }

    death() {
        // if(this.x == this.app.stage.getChildByName('Enemy').x) {
        console.log(this.x, this.y);
        if(this.x == 120 && this.y==141) {
            this.textures = this.sheets.death;
            this.playAnimation = false;
            this.loop = false;
            this.play();
        }
    }

    /**
     * цикл евентов
     * в нем берется самый первый евент и и самая первая координата для перемещения X или Y,
     * как только евент завершен он удаляется вместе с координатой, и так пока не закончатся евенты
     */
    myLoop() {
        if (this.events.length > 0 && this.events[0] == 'right') {
            this.animate('walk');
            this.x += this.speed;
            if (this.x >= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
                this.death();
            }
        } else if (this.events.length > 0 && this.events[0] == 'left') {
            this.animate('walk');
            this.x -= this.speed;
            if (this.x <= this.moveToX[0]) {
                this.x = this.moveToX[0];
                this.events.shift();
                this.moveToX.shift();
                this.death();
            }
        } else if (this.events.length > 0 && this.events[0] == 'down') {
            this.animate('walk');
            this.y += this.speed;
            if (this.y >= this.moveToY[0]) {
                this.y = this.moveToY[0];
                this.events.shift();
                this.moveToY.shift();
                this.death();
            }
        } else if (this.events.length > 0 && this.events[0] == 'up') {
            this.animate('walk');
            this.y -= this.speed;
            if (this.y <= this.moveToY[0]) {
                this.y = this.moveToY[0];
                this.events.shift();
                this.moveToY.shift();
                this.death();
            }
        } else if (this.events.length == 0 && this.playAnimation == true) { //проверка на окончания всех евентов
            this.stand();
        }
    }
}