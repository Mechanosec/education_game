export default class Object extends PIXI.AnimatedSprite {

    /**
     *
     * @param stage
     * @param config
     * @param x
     * @param y
     */
    constructor(stage, config, x, y) {
        super(config.sheets.stand); //установка первичной анимации персонажа

        this.stage = stage;
        this.name = config.name; //имя персонажа
        this.sheets = config.sheets; //набор спрайтов персонажа
        this.width = config.width; //ширина модели персонажа
        this.height = config.height; //высота модели персонажа
        this.realHeight = this.height / 2; //реальная высота модели персонажа
        this.speed = config.speed; //скорость перемещения персонажа
        this.anchor.set(0.5); //привязка координат персонажа к его центру
        this.setCoordinate(x, y);
        this.animationSpeed = 0.12; //скорость анимации
        this.step = 1; //количество чанков которые может пройти персонаж за 1 евент
        if (config.isCollision) {
            this.stage.collision.add(this, this.constructor.name);
        }

        this.stage.addChild(this); //добавление нашего персонажа в сцену

        this.play(); //запуск анимации
    }

    /**
     * установка коодинат
     * @param x
     * @param y
     */
    setCoordinate(x, y) {
        this.x = x + this.width / 2; //установка координаты X, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
        this.y = y + this.height / 2; //установка координаты Y, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
    }

    setPosition(posX, posY) {
        this.x = (posX + 1) * this.width - this.width / 2;
        this.y = posY * this.realHeight;
    }

    getBounds() {
        let bounds = super.getBounds();
        bounds['realHeight'] = this.realHeight;
        return bounds;
    }

    debug() {

    }
}