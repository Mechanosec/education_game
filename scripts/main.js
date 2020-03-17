import Hero from './person.js';
import {config} from  '../source/hero.js';


function initGround() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1);
    for (let j=0; j<7;j++) {
        for (let i = 0; i < 16; i++) {
            rectangle.drawRect(i * 80, j * 94, 80, 94);
        }
    }
    return rectangle;
}

window.onload = () => {
    PIXI.utils.sayHello('canvas');

    const app = new PIXI.Application({
        width: 1280,
        height: 658,
        backgroundColor: 0xFFFF44
    });
    let gpElem = document.getElementById('game-place');
    gpElem.appendChild(app.view);

    app.stage.addChild(initGround());

    let hero = new Hero(app, config,0, 0);

    //
    $(function () {
        function parserCommands(cmd) {
            let commands = cmd.split('\n');
            eval(commands[0]);
        }

        $('#run_game').click(function () {
            let commandsTextarea = $('#game_commands').val();
            parserCommands(commandsTextarea);
        });
    });
};
