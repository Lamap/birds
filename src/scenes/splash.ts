import * as PIXI from 'pixi.js';
import { TICKER } from "../app";

export default class SplashSceen extends PIXI.Container {
	private _BACKGROUND_IMAGE_SOURCE: string = "./assets/contraBirdsPage.png";

	public ON_SPLASH_END: string = "onSplashEnd";

	private _LIFE_LENGTH: number = 30;
	private _backgroundImage: PIXI.Sprite;

	constructor() {
		super();
		console.log("splash initialized");
		this._backgroundImage = PIXI.Sprite.fromImage(this._BACKGROUND_IMAGE_SOURCE);
		this.addChild(this._backgroundImage);
		setTimeout(this._fadeOut, this._LIFE_LENGTH);
	}


	private fading = () => {
		this.alpha -= 0.01;
		if (this.alpha < 0) {
			this.emit(this.ON_SPLASH_END);
			this.parent.removeChild(this);
			TICKER.remove(this.fading);
			this.destroy();
		}
	}
	private _fadeOut = () => {
		TICKER.add(this.fading);
	}
} 