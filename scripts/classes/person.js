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
        this.sheets = config.sheets; //набор спрайтов персонажа
        this.width = config.width; //ширина модели персонажа
        this.height = config.height; //высота модели персонажа
        this.speed = config.speed; //скорость перемещения персонажа

        this.anchor.set(0.5); //привязка координат персонажа к его центру
        this.x = (x + 1) + this.width / 2; //установка координаты X, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра
        this.y = (y + 1) + this.height / 2; //установка координаты Y, операции при присвоении нужны для того чтобы персонаж перемещался относительно сноего центра

        this.animationSpeed = 0.15; //скорость анимации
        this.step = 1; //количество чанков которые может пройти персонаж за 1 евент
        this.events = []; //массив евентов
        this.moveToX = []; //массив координат X, к которым должен прийти персонаж
        this.moveToY = []; //массив координат Y, к которым должен прийти персонаж

        this.app.stage.addChild(this); //добавление нашего персонажа в сцену
        this.playAnimation = false; //переменная отвечающая за то находится ли персонаж в движении
        this.play(); //запуск анимации
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
}