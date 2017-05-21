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

export default class Game extends PIXI.Container {
	private _background: Background;
	private _birdy: Birdy;
	private _contraBirds: IContraBirdPool = {};

	private _contrBirdMinTime: number = 5;
	private _contrBirdMaxTime: number = 20;

	private _contraBirdSetTimeOutId: number;

	private _gameService: GameService;

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
		this._gameService.stop();
		killerBird.kill();
		this._stopContraBirds();
	}

	private _addContraBird = () => {
		clearInterval(this._contraBirdSetTimeOutId);
		let contraBird = new ContraBird();
		this.addChild(contraBird);
		this._contraBirds[contraBird.id] = contraBird;
		contraBird.addListener(ContraBirdEvents.DESTROYED, (id: string) => {
			console.log(id);
			delete this._contraBirds[id];
		});
		const nextTime: number = Utils.getRandomNumberBetween(this._contrBirdMinTime, this._contrBirdMaxTime) * 200;
		console.log("nextTime:", nextTime, " ch length: ", this.children.length);
		if (this.children.length > 10) {
			console.error(new Error("too many items appeared"));
		}
		this._contraBirdSetTimeOutId = setTimeout(this._addContraBird, nextTime);
		console.log(this._contraBirdSetTimeOutId);
	};
}