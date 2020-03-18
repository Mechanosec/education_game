import Hero from './classes/hero.js';
import {config as heroConfig} from '../source/hero.js';


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
    const app = new PIXI.Application({
        width: 1280,
        height: 658,
        backgroundColor: 0xFFFF44,
        autoStart: false,
        forceCanvas: true
    });

    gpElem.appendChild(app.view);

    app.stage.addChild(initGround());

    let hero = new Hero(app, heroConfig, 0, 0);

    app.start();

    //
    $(function () {
        function parserCommands(cmd) {
            eval(cmd);
            // let commands = cmd.split('\n');
            // eval(commands[0]);
            // eval(commands[1]);
        }

        $('#run_game').click(function () {
            let commandsTextarea = $('#game_commands').val();
            parserCommands(commandsTextarea);
        });
    });
};
