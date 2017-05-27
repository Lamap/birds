import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";
import Utils from "../utils/utils";
import * as particles from "pixi-particles";
import { settings as EXPLOTION_SETTINGS } from "./contraBirdExplotion";
import { settings as SMOKE_SETTINGS } from "./contrabirdSmoke";

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
	private _EXPLOTION_PARTICLE_IMAGE: string = "./assets/contraBirds/explotion-particle.png";

	private _type: string;
	private _speed: number = 2;
	private _body: PIXI.Sprite;
	private _explotion: particles.Emitter;
	private _explotionLifeTime = 0;
	private _smoke: particles.Emitter;
	private _smokeCenter: PIXI.Container;

	constructor() {
		super();
		this._type = Utils.getRandomItem(this._BIRD_TYPES);
		this._create();
		TICKER.add(this._move);
		this.id = "contra-bird-" + new Date().getTime().toString();
	}

	public kill() {
		TICKER.remove(this._move);
		this._explotion = new particles.Emitter(this, [PIXI.Texture.fromImage(this._EXPLOTION_PARTICLE_IMAGE)], EXPLOTION_SETTINGS);
		this._explotion.emit = true;
		TICKER.add(this._exploding);
	}

	private _create = () => {
		this._smokeCenter = new PIXI.Container();
		switch (this._type) {
			case "bird1":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra1.png"));
				this._smokeCenter.x = 0;
				this._smokeCenter.y = -10;
				break;
			case "bird2":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra2.png"));
				this._smokeCenter.x = 0;
				this._smokeCenter.y = 0;
				break;
			case "bird3":
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra3.png"));
				this._smokeCenter.x = 0;
				this._smokeCenter.y = -30;
				break;
			case "bird4":
				this._smokeCenter.x = 0;
				this._smokeCenter.y = -10;
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra4.png"));
				break;
			default:
				this._body = new PIXI.Sprite(PIXI.Texture.fromImage("./assets/contraBirds/contra1.png"));
				break;
		}
		this.x = GAME_WIDTH + this._BIRD_BUFFER;
		this.y = Utils.getRandomNumberBetween(0, GAME_HEIGHT - this._BIRD_BUFFER);
		TICKER.add(this._smoking);
		this.addChild(this._smokeCenter);
		this.addChild(this._body);
		this._smoke = new particles.Emitter(this._smokeCenter, [PIXI.Texture.fromImage(this._EXPLOTION_PARTICLE_IMAGE)], SMOKE_SETTINGS);
	};
	private _move = () => {
		this.x -= this._speed;
		if (this.x < - this._BIRD_BUFFER - this.width) {
			TICKER.remove(this._move);
			TICKER.remove(this._smoking);
			this.parent.removeChild(this);
			this.emit(Events.DESTROYED, this.id);

			this.destroy();
		}
	}

	private _exploding = () => {
		if (this._explotionLifeTime > this._explotion.emitterLifetime) {
			TICKER.remove(this._exploding);
		}
		this._explotion.update(this._explotionLifeTime);
		this._explotionLifeTime++;
		this.alpha -= 0.2;
	}

	private _smoking = (delta: number) => {
		this._smoke.update(delta);
		this._smoke.updateOwnerPos
	};
}