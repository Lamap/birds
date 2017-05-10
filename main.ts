import { Test } from "./src/test";
import * as PIXI from 'pixi.js';
console.log("main.ts....");
class Main {
	private testClass: Test;
	constructor() {
		this.testClass = new Test();
		console.log(":::", this.testClass.testProperty);
		var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0xeeeeee});
		document.body.appendChild(renderer.view);

		var stage = new PIXI.Container();
		var texture = PIXI.Texture.fromImage('assets/test.png');
		var test = new PIXI.Sprite(texture);
		test.anchor.x = 0.5;
		test.anchor.y = 0.5;
		test.position.x = 400;
		test.position.y = 300;
		test.scale.x = 1;
		test.scale.y = 1;
		stage.addChild(test);
		animate();

		function animate() {
		    requestAnimationFrame(animate);
		    var test = stage.getChildAt(0);
		    test.rotation += 0.01;
		    renderer.render(stage);
		}
	}
}
//console.log(new Test().testProperty);

new Main();

