import * as PIXI from 'pixi.js';
import { TICKER, GAME_WIDTH, GAME_HEIGHT } from "../app";

export default class MainSceen extends PIXI.Container {
	public GO_TO_GAME: string = "goToGame";
	public GO_TO_EXIT: string = "goToExit";

	private _BACKGROUND_IMAGE_SOURCE: string = "./assets/scenes/main.png";
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
		this._background = new PIXI.Sprite(PIXI.Texture.fromImage(this._BACKGROUND_IMAGE_SOURCE));
		this.addChild(this._background);

		this._game1Button = this._createTextButton("Level 1", 10, 10);
		this._game2Button = this._createTextButton("Level 2", 110, 10);
		this._game3Button = this._createTextButton("Level 3", 210, 10);
		this._exitButton = this._createTextButton("Exit", 10, GAME_HEIGHT - 30);

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