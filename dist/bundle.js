/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = (function () {
    function Test() {
        this.testProperty = "jenő";
        console.log("test constructor");
    }
    return Test;
}());
exports.Test = Test;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = __webpack_require__(0);
var PIXI = __webpack_require__(2);
console.log("main.ts....");
var Main = (function () {
    function Main() {
        this.testClass = new test_1.Test();
        console.log(":::", this.testClass.testProperty);
        var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0xeeeeee });
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
    return Main;
}());
//console.log(new Test().testProperty);
new Main();


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = PIXI;

/***/ }
/******/ ]);