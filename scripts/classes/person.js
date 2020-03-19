export default class Person extends PIXI.AnimatedSprite {
    /**
     *
     * @param app
     * @param config
     * @param x
     * @param y
     */
    constructor(app, config, x, y) {
        super(config.sheets.stand); //установка первичной анимации персонажа

        this.app = app;
        this.name = config.name; //имя персонажа
        this.sheets = config.sheets; //набор спрайтов персонажа
        this.width = config.width; //ширина модели персонажа
        this.height = config.height; //высота модели персонажа
        this.speed = config.speed; //скорость перемещения персонажа

        this.anchor.set(0.5); //привязка координат персонажа к его центру
        this.x = x + this.width / 2; //установка координаты X, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
        this.y = y + this.height / 2; //установка координаты Y, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра

        this.animationSpeed = 0.12; //скорость анимации
        this.step = 1; //количество чанков которые может пройти персонаж за 1 евент
        this.events = []; //массив евентов
        this.moveToX = []; //массив координат X, к которым должен прийти персонаж
        this.moveToY = []; //массив координат Y, к которым должен прийти персонаж

        this.app.stage.addChild(this); //добавление нашего персонажа в сцену
        this.playAnimation = false; //переменная отвечающая за то находится ли персонаж в движении
        this.play(); //запуск анимации

        
        this.app.ticker.add(this.myLoop.bind(this));
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