import Hero from './person.js';

window.onload = () => {
    PIXI.utils.sayHello('canvas');

    const app = new PIXI.Application({
        width: 1280,
        height: 720,
        backgroundColor: 0xFFFFFF
    });
    let gpElem = document.getElementById('game-place');
    gpElem.appendChild(app.view);

    let person = new Hero(app, {src:'../sprites/hero.png'}, app.view.width / 2, app.view.height / 2, 80, 94, 5);
};
