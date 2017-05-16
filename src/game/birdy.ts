import * as PIXI from 'pixi.js';
import { TICKER } from "../app";
import { KeyNavigation, Events as KeyEvents } from "../utils/keyNavigation";

export default class Birdy extends PIXI.Sprite {
	private _keyNavigator: KeyNavigation;

	constructor() {
		super();
		console.log("Birdy init");

		let testBody: PIXI.Graphics = new PIXI.Graphics();
		testBody.lineStyle(0);
		testBody.beginFill(0xABCDEF, 1);
		testBody.drawCircle(30, 30, 30);
		testBody.endFill();
		this.addChild(testBody);

		this._keyNavigator = new KeyNavigation();
		this._keyNavigator.on(KeyEvents.DOWN, this._moveDown);
		this._keyNavigator.on(KeyEvents.UP, this._moveUp);
		this._keyNavigator.on(KeyEvents.LEFT, this._moveLeft);
		this._keyNavigator.on(KeyEvents.RIGHT, this._moveRight);
	}

	private _moveDown = () => {
		this._move(new PIXI.Point(0, 20));
	}
	private _moveUp = () => {
		this._move(new PIXI.Point(0, -20));
	}
	private _moveLeft = () => {
		this._move(new PIXI.Point(-20, 0));
	}
	private _moveRight = () => {
		this._move(new PIXI.Point(20, 0));
	}

	private _move = (movement: PIXI.Point) => {
		this.x += movement.x;
		this.y += movement.y;
	}
}