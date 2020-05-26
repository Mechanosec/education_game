import Object from "./object.js";

export default class Person extends Object {
    /**
     *
     * @param stage
     * @param config
     * @param x
     * @param y
     */
    constructor(stage, config, x, y) {
        super(stage, config, x, y);

        this.events = []; //массив евентов
        this.moveToX = []; //массив координат X, к которым должен прийти персонаж
        this.moveToY = []; //массив координат Y, к которым должен прийти персонаж

        this.playAnimation = false; //переменная отвечающая за то находится ли персонаж в движении
        this.stage.ticker.add(this.myLoop.bind(this));
        this.stage.ticker.start();
    }

    /**
     * анимирование движения
     * @param spriteName
     */
    animate(spriteName) {
        if (!this.playAnimation) {
            this.playAnimation = true;
            this.textures = this.sheets[spriteName];
            this.play();
        }
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
        if (currentX < this.stage.view.width - (this.width / 2)) { //проверка на край приложения
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
        if (currentY < this.stage.view.height - (this.realHeight)) { //проверка на край приложения
            this.scale.x = 1;
            this.moveToY.push(currentY + (this.step * this.realHeight));
            this.events.push('down');
        }

    }

    /**
     * состояние движения вверх
     */
    up() {
        let currentY = this.calcMoveToY();
        if (currentY > (this.realHeight)) { //проверка на край приложения
            this.scale.x = 1;
            this.moveToY.push(currentY - (this.step * this.realHeight));
            this.events.push('up');
        }

    }

    death() {
        if (this.x == 120 && this.y == 94) {
            this.textures = this.sheets.death;
            this.playAnimation = false;
            this.loop = false;
            this.play();
        }
    }

    clearAll() {
        this.events = [];
        this.moveToX = [];
        this.moveToY = [];
    }

    bumpChecker() {}


    /**
     * цикл евентов
     * в нем берется самый первый евент и и самая первая координата для перемещения X или Y,
     * как только евент завершен он удаляется вместе с координатой, и так пока не закончатся евенты
     */
    myLoop() {
        this.bumpChecker();
        // if (this.events.length > 0 && this.stage.collision.checkBump(this)) {
        //     this.clearAll();
        //     this.stage.isAnd = true;
        // }
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