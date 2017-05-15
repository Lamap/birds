import * as PIXI from 'pixi.js';
import { TICKER } from "../app";

export default class Splash extends PIXI.Container {
	private _BACKGROUND_SOURCE: string = "./assets/test.png";

	public ON_SPLASH_END: string = "onSplashEnd";
	
	private background: PIXI.Sprite;

	constructor() {
		super();
		console.log("splash initialized");
		this.background = PIXI.Sprite.fromImage(this._BACKGROUND_SOURCE);
		this.addChild(this.background);
	}


	private fading = () => {
		this.alpha -= 0.01;
		if (this.alpha < 0) {
			this.emit(this.ON_SPLASH_END, "béla");
			this.parent.removeChild(this);
			TICKER.remove(this.fading);
			this.destroy();
		}
	}
	public fadeOut = () => {
		TICKER.add(this.fading);
	}
} 