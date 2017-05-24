import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";
import Utils from "../utils/utils";

export var Events = {
	DESTROYED: "contraBirdDestroyed"
};

export class ContraBird extends PIXI.Container {
	public id: string;
	private _BIRD_TYPES: string[] = [
		"bird1",
		"bird2",
		"bird3",
		"bird4"
	];
	private _BIRD_BUFFER: number = 100;
	private _type: string;
	private _speed: number = 2;
	private _body: PIXI.Sprite;

	constructor() {
		super();
		this._type = Utils.getRandomItem(this._BIRD_TYPES);
		this._create();
		TICKER.add(this._move);
		this.id = "contra-bird-" + new Date().getTime().toString();
	}

	public kill() {
		TICKER.remove(this._move);
	}

	private _create = () => {
		switch (this._type) {
			case "bird1":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra1.png"));
				break;
			case "bird2":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra2.png"));
				break;
			case "bird3":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra3.png"));
				break;
			case "bird4":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra4.png"));
				break;
			default:
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra1.png"));
				break;
		}
		this.x = GAME_WIDTH + this._BIRD_BUFFER;
		this.y = Utils.getRandomNumberBetween(0, GAME_HEIGHT - this._BIRD_BUFFER);
		this.addChild(this._body);
	};
	private _move = () => {
		this.x -= this._speed;
		if (this.x < - this._BIRD_BUFFER - this.width) {
			TICKER.remove(this._move);
			this.parent.removeChild(this);
			this.emit(Events.DESTROYED, this.id);

			this.destroy();
		}
	}
}