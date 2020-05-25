import App from "./scene/app.js";

import Level1 from "./scene/levels/level1.js";
import Level2 from "./scene/levels/level2.js";
import Level3 from "./scene/levels/level3.js";

window.onload = () => {
    const gpElem = document.getElementById('game-place');
    const app = new App({ //инициализация приложения
        width: 1280,
        height: 658,
        backgroundColor: 0xFFFF44,
        autoStart: false, //отключения автостарта приложения(нужно для того чтобы персонажи и прочее успели инициализироваться)
        forceCanvas: true //насильное включение канваса
    }, [
        Level1,
        Level2,
        Level3,
    ]);
    gpElem.appendChild(app.view); //добавление приложения в елемент страницы

    app.start(); //запуск приложения

};
