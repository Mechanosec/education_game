import Hero from './classes/hero.js';
import Enemy from './classes/enemy.js';
import {config as heroConfig} from '../source/hero.js';
import {config as enemyConfig} from '../source/enemy.js';

/**
 * инициализация заднего фона приложения(искуственная визуализация чанков)
 * @returns {Graphics}
 */
function initGround() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1);
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 16; i++) {
            rectangle.drawRect(i * 80, j * 94, 80, 94);
        }
    }
    return rectangle;
}

window.onload = () => {
    const gpElem = document.getElementById('game-place');
    const app = new PIXI.Application({ //инициализация приложения
        width: 1280,
        height: 658,
        backgroundColor: 0xFFFF44,
        autoStart: false, //отключения автостарта приложения(нужно для того чтобы персонажи и прочее успели инициализироваться)
        forceCanvas: true //насильное включение канваса
    });

    gpElem.appendChild(app.view); //добавление приложения в елемент страницы

    app.stage.addChild(initGround()); //добавление заднего фона в сцену

    let hero = new Hero(app, heroConfig, 0, 0);
    let enemy = new Enemy(app, enemyConfig, 3*80, 0);

    app.start(); //запуск приложения

    //
    $(function () {
        function parserCommands(cmd) {
            eval(cmd);
        }

        $('#run_game').click(function () {

            let commandsTextarea = $('#game_commands').val();
            parserCommands(commandsTextarea);
        });
    });
};
