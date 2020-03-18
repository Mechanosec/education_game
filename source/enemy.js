let source = '../sprites/hero.png';

let textures = new PIXI.BaseTexture.from(source);
let config = {
    'name': 'Enemy',
    'width': 80,
    'height': 94,
    'speed': 7,
    'sheets': {
        'stand': [],
        'walk': [],
        'death': [],
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
// инициализация спрайти смерти
// for (let i = 3; i <= 7; i++) {
config.sheets.death.push(new PIXI.Texture(textures, new PIXI.Rectangle(3 * config.width, 3 * config.height, config.width, config.height)));
config.sheets.death.push(new PIXI.Texture(textures, new PIXI.Rectangle(4 * config.width + 5, 3 * config.height, config.width, config.height)));
config.sheets.death.push(new PIXI.Texture(textures, new PIXI.Rectangle(5 * config.width + 18, 3 * config.height, config.width, config.height)));
config.sheets.death.push(new PIXI.Texture(textures, new PIXI.Rectangle(6 * config.width + 25, 3 * config.height, config.width, config.height)));
// }

export {config};