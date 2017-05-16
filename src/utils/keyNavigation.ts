import * as PIXI from 'pixi.js';

export var Events = {
	UP: "up",
	DOWN: "down",
	LEFT: "left",
	RIGHT: "right"
}
export class KeyNavigation extends PIXI.utils.EventEmitter {
	
	constructor() {
		super();
		//TODO: make it to singleton
		document.addEventListener('keydown', this._onKeyDown);
	}

	private _onKeyDown = (event: KeyboardEvent) => {
		console.log(event.key);

		switch (event.key) {
			case "ArrowUp":
				// code...
				this.emit(Events.UP);
				break;
			case "ArrowDown":
				this.emit(Events.DOWN);
				break;
			case "ArrowLeft":
				this.emit(Events.LEFT);
				break;
			case "ArrowRight":
				this.emit(Events.RIGHT);
				break;
		}

	}
}