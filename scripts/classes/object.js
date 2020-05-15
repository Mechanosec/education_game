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
        this.speed = config.speed; //скорость перемещения персонажа
        this.anchor.set(0.5); //привязка координат персонажа к его центру
        this.x = x + this.width / 2; //установка координаты X, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
        this.y = y + this.height / 2; //установка координаты Y, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
        this.firstXpos = this.x;
        this.firstYpos = this.y;
        this.animationSpeed = 0.12; //скорость анимации
        this.step = 1; //количество чанков которые может пройти персонаж за 1 евент
        if (config.isCollision) {
            this.stage.collision.add(this);
        }

        // if(!config.isMain) {
        this.stage.addChild(this); //добавление нашего персонажа в сцену
        // }

        this.play(); //запуск анимации
    }

    debug() {

    }
}