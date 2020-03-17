let source = '../sprites/hero.png';

let textures = new PIXI.BaseTexture.from(source);
let config = {
    'width': 80,
    'height': 94,
    'speed': 5,
    'sheets': {
        'stand': [],
        'walk': [],
        'left': [],
    }
};

// инициализация спрайти в состоянии стоять
for (let i = 0; i <= 7; i++) {
    config.sheets.stand.push(new PIXI.Texture(textures, new PIXI.Rectangle(i * config.width, 0, config.width, config.height)));
}
// инициализация спрайти хотьба
for (let i = 0; i <= 5; i++) {
    config.sheets.walk.push(new PIXI.Texture(textures, new PIXI.Rectangle(i * config.width, config.height, config.width, config.height)));
}
// инициализация спрайти хотьба влево
for (let i = 0; i <= 5; i++) {
    config.sheets.left.push(new PIXI.Texture(textures, new PIXI.Rectangle(i * config.width, 2 * config.height, config.width, config.height)));
}

export {config};