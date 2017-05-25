import * as PIXI from 'pixi.js';
import { TICKER } from "../app";
import { KeyNavigation, Events as KeyEvents } from "../utils/keyNavigation";

export default class Birdy extends PIXI.Sprite {
	private _keyNavigator: KeyNavigation;

	private _THROW_SPEED: number = 1;

	constructor() {
		super();
		console.log("Birdy init");

		let body: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/birdy.png"));

		this.addChild(body);

		this._keyNavigator = new KeyNavigation();
		this._keyNavigator.on(KeyEvents.DOWN, this._moveDown);
		this._keyNavigator.on(KeyEvents.UP, this._moveUp);
		this._keyNavigator.on(KeyEvents.LEFT, this._moveLeft);
		this._keyNavigator.on(KeyEvents.RIGHT, this._moveRight);
	}
	public throwAway = () => {
		//TODO: should be done with tweening it looks weird without
		//TICKER.add(this._throwing);
	};

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
	private _throwing = () => {
		this.x -= this._THROW_SPEED * 10;
		this.y -= this._THROW_SPEED * 10;
		this.rotation += this._THROW_SPEED * 0.4;
	}
	
}