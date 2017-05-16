import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";
import Background from "./runningBackground";
import Birdy from "./birdy";

export default class Game extends PIXI.Container {
	private _background: Background;
	private _birdy: Birdy;

	constructor() {
		super();
		console.log("game init");

		// create Birdy
		this._birdy = new Birdy();
		this.addChild(this._birdy);
		this._birdy.x = GAME_WIDTH / 2;
		this._birdy.y = GAME_HEIGHT / 2;

		// create paralax Bg
		this._background = new Background();
	}
}