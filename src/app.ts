import * as PIXI from 'pixi.js';
import Splash from "./scenes/splash";

export var TICKER: PIXI.ticker.Ticker;

class App {
	private GAME_WIDTH: number = 800;
	private GAME_HEIGHT: number = 600;

	private splashScreen: Splash;
	
	constructor() {
		var app = new PIXI.Application(this.GAME_WIDTH, this.GAME_HEIGHT, {backgroundColor: 0xEEEEEE});
		document.body.appendChild(app.view);

		TICKER = app.ticker;
		let stage = new PIXI.Container();
		this.splashScreen = new Splash();
		
		app.stage.addChild(this.splashScreen);
		this.splashScreen.on(this.splashScreen.ON_SPLASH_END, (param) => {
			console.log("splashEnd", param);
		});

		setTimeout(this.splashScreen.fadeOut, 4000);
		
	}
}

new App();

