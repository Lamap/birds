import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";

export default class ParalaxBackground extends PIXI.Container {
	private _FAR_BG_SOURCE: string = "./assets/bgs/far-bg.svg";
	private _CLOSE_BG_SOURCE: string = "./assets/bgs/close-bg.svg";

	private _distanceFar: PIXI.extras.TilingSprite;
	private _distanceClose: PIXI.extras.TilingSprite;

	constructor() {
		super();
		console.log("paralax Bg init");
		this._distanceFar = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(this._FAR_BG_SOURCE), GAME_WIDTH, GAME_HEIGHT);
		this._distanceClose = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(this._CLOSE_BG_SOURCE), GAME_WIDTH, GAME_HEIGHT);

		this.addChild(this._distanceFar);
		this.addChild(this._distanceClose);

		TICKER.add(this._moveClose);
		TICKER.add(this._moveFar);
	}

	private _moveFar = () => {
		this._distanceFar.tilePosition.x -= 0.5;
	}
	private _moveClose = () => {
		this._distanceClose.tilePosition.x -= 1;
	}

	public kill = () => {
		TICKER.remove(this._moveClose);
		TICKER.remove(this._moveFar);
	}
}