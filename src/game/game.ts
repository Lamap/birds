import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";
import Background from "./runningBackground";
import Birdy from "./birdy";
import { ContraBird, Events as ContraBirdEvents } from "./contraBird";
import Utils from "../utils/utils";
import { GameService, Events as GameEvents} from "../services/gameService";

export interface IContraBirdPool {
	[index: string]: ContraBird;
};

export var Events = {
	GAME_OVER: "gameOVer",
	GO_TO_MAIN: "goToMain",
	RESTART_GAME: "restartGame"
}

export class Game extends PIXI.Container {
	private _background: Background;
	private _birdy: Birdy;
	private _contraBirds: IContraBirdPool = {};

	private _contrBirdMinTime: number = 5;
	private _contrBirdMaxTime: number = 20;

	private _contraBirdSetTimeOutId: number;

	private _gameService: GameService;
	private _newGameButton: PIXI.Text;
	private _goBackButton: PIXI.Text;

	constructor() {
		super();
		console.log("game init");
		this._startGame();
	}


	private _startGame = () => {
		// create paralax Bg
		this._background = new Background();
		this.addChild(this._background);
		
		// create Birdy
		this._birdy = new Birdy();
		this.addChild(this._birdy);
		this._birdy.x = GAME_WIDTH / 2;
		this._birdy.y = GAME_HEIGHT / 2;

		// add ContraBirds randomly
		this._sendContraBirds();

		this._gameService = new GameService(this._birdy, this._contraBirds);
		this._gameService.addListener(GameEvents.BIRD_HIT_BIRDY, this._birdyGotHit);
		this._gameService.start();
	};

	private _sendContraBirds() {
		this._contraBirdSetTimeOutId = setTimeout(this._addContraBird, Utils.getRandomNumberBetween(this._contrBirdMinTime, this._contrBirdMaxTime));
	}
	private _stopContraBirds() {
		clearInterval(this._contraBirdSetTimeOutId);
	}

	private _birdyGotHit = (killerBird: ContraBird) => {
		console.log("Birdy got hit", killerBird);
		this._showButtons();
		this._gameService.stop();
		killerBird.kill();
		//this._killAllBirds();
		this._stopContraBirds();
		this._background.kill();
		this._birdy.throwAway();

		//TODO: this kills the addChild too, figure out other proper and generic way of killing all animations
		//TICKER.stop();
	}

	private _addContraBird = () => {
		clearInterval(this._contraBirdSetTimeOutId);
		let contraBird = new ContraBird();
		this.addChild(contraBird);
		this._contraBirds[contraBird.id] = contraBird;
		contraBird.addListener(ContraBirdEvents.DESTROYED, (id: string) => {
			delete this._contraBirds[id];
		});
		const nextTime: number = Utils.getRandomNumberBetween(this._contrBirdMinTime, this._contrBirdMaxTime) * 200;
		this._contraBirdSetTimeOutId = setTimeout(this._addContraBird, nextTime);
	};

	private _showButtons = () => {
		this._newGameButton = new PIXI.Text("You died, wanna try again?");
		this._goBackButton = new PIXI.Text("Return to main");
		this.addChild(this._goBackButton);
		this.addChild(this._newGameButton);
		this._goBackButton.x = (GAME_WIDTH - this._goBackButton.width) / 2;
		this._newGameButton.x = (GAME_WIDTH - this._newGameButton.width) / 2;
		this._newGameButton.y = 10;
		this._goBackButton.y = 60;
		this._goBackButton.buttonMode = true;
		this._goBackButton.interactive = true;
		this._newGameButton.buttonMode = true;
		this._newGameButton.interactive = true;

		this._newGameButton.addListener("mousedown", this._startNewGame);
		this._goBackButton.addListener("mousedown", this._gotToMain);

	}

	private _startNewGame = () => {
		this.emit(Events.RESTART_GAME);
	}
	private _gotToMain = () => {
		this.emit(Events.GO_TO_MAIN);
	}

	private _killAllBirds = () => {
		for (let i in this._contraBirds) {
			const contraBird: ContraBird = this._contraBirds[i];
			contraBird.kill();
		}
	}
}