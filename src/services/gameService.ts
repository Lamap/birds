import Birdy from "../game/birdy";
import { ContraBird } from "../game/contraBird";
import { IContraBirdPool } from "../game/game";
import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";

interface ICenterPoint {
	x: number;
	y: number;
}
export var Events = {
	BIRD_HIT_BIRDY: "birdHitBurdy",
	BIRD_CATCHED_FLY: "birdCatchedFly",
	FLY_SHOT_A_BIRD: "flyShotABird"
};

export class GameService extends PIXI.utils.EventEmitter {
	private _birdy: Birdy;
	private _contraBirds: IContraBirdPool;

	constructor(birdy: Birdy, contraBirds: IContraBirdPool) {
		super();
		//TODO: make it singleton

		this._birdy = birdy;
		this._contraBirds = contraBirds;

	}

	public start() {
		TICKER.add(this._detectBirds);
	}
	public stop() {
		TICKER.remove(this._detectBirds);
	}

	private _detectBirds = () => {
		for (let index in this._contraBirds) {
			const contraBird: ContraBird = this._contraBirds[index];
			if (this._detectCollision(this._birdy, contraBird, 20)) {
				this.emit(Events.BIRD_HIT_BIRDY, contraBird);
			}
		}
	};

	private _detectCollision(body1: PIXI.DisplayObject, body2: PIXI.DisplayObject, overlap?: number): boolean {
		
		const b1: PIXI.Rectangle = body1.getBounds();
		const b2: PIXI.Rectangle = body2.getBounds();
		const over: number = overlap | 0;
		//const check = b1.x + b1.width > b2.x && b1.x < b2.x + b2.width && b1.y + b1.height > b2.height && b1.y < b2.y + b2.height;
	
		const untouch = 
			b2.x > b1.x + b1.width - over || 
           	b1.x > b2.x + b2.width - over || 
          	b2.y > b1.y + b1.height - over ||
         	b2.y + b2.height - over < b1.y

		if (untouch) {
			console.log(b1, b2);
		}

		return !untouch;
	}
}
