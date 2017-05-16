import * as PIXI from 'pixi.js';
import { TICKER } from "../app";

export default class MainSceen extends PIXI.Container {
	public GO_TO_GAME: string = "goToGame";
	public GO_TO_EXIT: string = "goToExit";

	private _BACKGROUND_IMAGE_SOURCE: string = "./assets/test.png";
	private _LOGO_IMAGE_SOURCE: string = "./assets/test.png";
	private _EXIT_IMAGE_SOURCE: string = "./assets/test.png";

	private _background: PIXI.Sprite;
	private _logo: PIXI.Sprite;
	private _game1Button: PIXI.Text;
	private _game2Button: PIXI.Sprite;
	private _game3Button: PIXI.Text;
	private _exitButton: PIXI.Text;

	constructor() {
		super();
		console.log("MainSceen init");

		this._game1Button = this._createTextButton("Game 1", 10, 10);
		this._game2Button = this._createTextButton("Game2", 100, 10);
		this._game3Button = this._createTextButton("Game3", 200, 10);
		this._exitButton = this._createTextButton("Exit", 10, 500);

		this.addChild(this._game1Button);
		this.addChild(this._game2Button);
		this.addChild(this._game3Button);
		this.addChild(this._exitButton);

		this._game1Button.addListener("mousedown", this._gameClicked);
		this._game2Button.addListener("mousedown", this._gameClicked);
		this._game3Button.addListener("mousedown", this._gameClicked);
		this._exitButton.addListener("mousedown", this._exitClicked);

	}

	private _gameClicked = () => {
		this.emit(this.GO_TO_GAME);
		this.parent.removeChild(this);
	}

	private _exitClicked = () => {
		this.emit(this.GO_TO_EXIT);
	}

	private _createTextButton = (text: string, x: number, y: number): PIXI.Text => {
		let button: PIXI.Text = new PIXI.Text(text);
		button.position = new PIXI.Point(x, y);
		button.buttonMode = true;
		button.interactive = true;
		return button;
	}
}