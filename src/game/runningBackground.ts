import * as PIXI from 'pixi.js';
import { TICKER } from "../app";

export default class ParalaxBackground extends PIXI.Container {
	private distanceFar: PIXI.extras.TilingSprite;
	private distanceClose: PIXI.extras.TilingSprite;

	constructor() {
		super();
		console.log("paralax Bg init");

	}
}