import * as PIXI from 'pixi.js';
import SplashSceen from "./scenes/splash";
import MainSceen from "./scenes/main";
import { Game, Events as GameEvents } from "./game/game";

export var TICKER: PIXI.ticker.Ticker;
export var GAME_WIDTH: number = 800;
export var GAME_HEIGHT: number = 600;

class App {

	private _app: PIXI.Application;
	private _splashSceen: SplashSceen;
	private _mainSceen: MainSceen;
	private _game: Game;
	
	constructor() {
		this._app = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT, {backgroundColor: 0xEEEEEE});
		document.body.appendChild(this._app.view);

		TICKER = this._app.ticker;
		let stage = new PIXI.Container();
		this._splashSceen = new SplashSceen();
		
		this._app.stage.addChild(this._splashSceen);
		this._splashSceen.on(this._splashSceen.ON_SPLASH_END, this._goToMainSceen);
	}

	private _goToMainSceen = () => {
		this._cleanMainScene();
		this._cleanGame();

		this._mainSceen = new MainSceen();
		this._app.stage.addChild(this._mainSceen);
		this._mainSceen.on(this._mainSceen.GO_TO_GAME, this._goToGame);
		this._mainSceen.on(this._mainSceen.GO_TO_EXIT, this._handleExit);
	}

	private _goToGame = () => {
		console.log("gotoGame");
		this._cleanMainScene();
		this._cleanGame();
		this._game = new Game();
		this._game.addListener(GameEvents.GO_TO_MAIN, this._goToMainSceen);
		this._game.addListener(GameEvents.RESTART_GAME, this._goToGame);
		this._app.stage.addChild(this._game);
	}
	private _cleanGame = () => {
		if (this._game) {
			this._app.stage.removeChild(this._game);
			this._game.destroy();
		}
	}
	private _cleanMainScene = () => {
		if (this._mainSceen) {
			this._app.stage.removeChild(this._mainSceen);
			this._mainSceen.destroy();
		}
	}
	private _handleExit = () => {
		console.log("exit");
	}

}

new App();

