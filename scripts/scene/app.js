export default class App extends PIXI.Application{
    constructor(settings, stages) {
        super(settings);
        this.stages = stages;
        this.currentLevel = 0;
        this.stage = new this.stages[this.currentLevel]();

        this.appTicker = new PIXI.Ticker();
        this.appTicker.add(this.CheckLevel.bind(this));
        this.appTicker.start();
    }

    CheckLevel() {
        if(this.stage.isAnd) {
            this.currentLevel += 1;
            this.stage = new this.stages[this.currentLevel];
        } else if (this.stage.isDead) {
            this.stage = new this.stages[this.currentLevel]();
        }
    }
}