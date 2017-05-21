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
		"bird3"
	];
	private _BIRD_BUFFER: number = 100;
	private _type: string;
	private _speed: number = 2;
	private _body: PIXI.Graphics;

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
				//this._body = new PIXI.Sprite(PIXI.Texture.fromImage());
				this._body = new PIXI.Graphics();
				this._body.lineStyle(0);
				this._body.beginFill(0xFF0000, 1);
				this._body.drawRect(0, 0, 40, 40);
				this._body.endFill();
				break;
			case "bird2":
				//this._body = new PIXI.Sprite(PIXI.Texture.fromImage());
				this._body = new PIXI.Graphics();
				this._body.lineStyle(0);
				this._body.beginFill(0x00FF00, 1);
				this._body.drawRect(0, 0, 40, 40);
				this._body.endFill();
				break;
			case "bird3":
				//this._body = new PIXI.Sprite(PIXI.Texture.fromImage());
				this._body = new PIXI.Graphics();
				this._body.lineStyle(0);
				this._body.beginFill(0x0000FF, 1);
				this._body.drawRect(0, 0, 40, 40);
				this._body.endFill();
				break;
			default:
				this._body = new PIXI.Graphics();
				this._body.lineStyle(0);
				this._body.beginFill(0x0000FF, 1);
				this._body.drawCircle(40, 40, 40);
				this._body.endFill();
				break;
		}
		this.x = GAME_WIDTH + this._BIRD_BUFFER;
		this.y = Utils.getRandomNumberBetween(0, GAME_HEIGHT - this._BIRD_BUFFER);
		this.addChild(this._body);
	};
	private _move = () => {
		this.x -= this._speed;
		if (this.x < - this._BIRD_BUFFER) {
			//TODO: remove contraBird
			TICKER.remove(this._move);
			this.parent.removeChild(this);
			this.emit(Events.DESTROYED, this.id);

			this.destroy();
		}
	}
}