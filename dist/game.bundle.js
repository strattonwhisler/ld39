/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(2);
var Node = (function () {
    function Node() {
        this.position = new vector_1.Vector();
        this.globalPosition = new vector_1.Vector();
        this.doUpdate = true;
        this.parent = null;
        this.children = [];
    }
    Node.prototype.nupdate = function (delta) {
        if (this.doUpdate) {
            this.update(delta);
            if (this.parent) {
                this.globalPosition = vector_1.Vector.clone(this.parent.globalPosition).add(this.position);
            }
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.nupdate(delta);
            }
        }
    };
    Node.prototype.ndraw = function (ctx) {
        this.draw(ctx);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.ndraw(ctx);
        }
    };
    Node.prototype.update = function (delta) { };
    ;
    Node.prototype.draw = function (ctx) { };
    ;
    Node.prototype.addChild = function (child) {
        child.parent = this;
        child.globalPosition = vector_1.Vector.clone(this.globalPosition).add(child.position);
        this.children.push(child);
    };
    Node.prototype.removeChild = function (child) {
        child.parent = null;
        child.globalPosition = vector_1.Vector.clone(child.position);
        this.children.splice(this.children.indexOf(child), 1);
    };
    return Node;
}());
exports.Node = Node;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = (function () {
    function Sprite(src) {
        var _this = this;
        this.image = new Image();
        this.image.src = src;
        this.ready = null;
        this.image.onload = function () { _this.ready = true; };
        this.image.onerror = function () { _this.ready = false; };
    }
    Sprite.prototype.get = function () {
        if (this.ready) {
            return this.image;
        }
        else {
            return new Image(1, 1);
        }
    };
    ;
    return Sprite;
}());
exports.Sprite = Sprite;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector.clone = function (v) {
        return new Vector(v.x, v.y);
    };
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vector.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vector.prototype.mul = function (k) {
        this.x *= k;
        this.y *= k;
        return this;
    };
    Vector.prototype.div = function (k) {
        this.x /= k;
        this.y /= k;
        return this;
    };
    Vector.prototype.normalize = function () {
        var l = this.length;
        this.x /= l;
        this.y /= l;
        return this;
    };
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Input = (function () {
    function Input() {
        var _this = this;
        this.down = [];
        document.addEventListener('keydown', function (event) {
            event.preventDefault();
            _this.onKeyDown(event);
        });
        document.addEventListener('keyup', function (event) {
            event.preventDefault();
            _this.onKeyUp(event);
        });
    }
    Input.prototype.onKeyDown = function (event) {
        if (!this.down.includes(event.code)) {
            this.down.push(event.code);
        }
    };
    Input.prototype.onKeyUp = function (event) {
        if (this.down.includes(event.code)) {
            this.down.splice(this.down.indexOf(event.code), 1);
        }
    };
    Input.prototype.isDown = function (name) {
        return this.down.includes(name);
    };
    return Input;
}());
exports.input = new Input();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(2);
var Neon = (function (_super) {
    __extends(Neon, _super);
    function Neon(owner, src, drawOptions) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.isOn = true;
        _this.alwaysOn = false;
        _this.drawOptions = drawOptions;
        _this.sprite = new sprite_1.Sprite(src);
        return _this;
    }
    Neon.prototype.update = function (delta) {
        this.position = vector_1.Vector.clone(this.owner.position);
    };
    Neon.prototype.draw = function (ctx) {
        if (this.isOn || this.alwaysOn) {
            ctx.drawImage(this.sprite.get(), this.globalPosition.x + this.drawOptions.offsetX, -this.globalPosition.y + this.drawOptions.offsetY, this.drawOptions.width, this.drawOptions.height);
        }
    };
    return Neon;
}(node_1.Node));
exports.Neon = Neon;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(6);
var ld39_1 = __webpack_require__(7);
function onload() {
    var config = {
        width: 800,
        height: 500
    };
    var engine = new engine_1.Engine();
    engine.start(new ld39_1.LD39(), config);
}
window.onload = onload;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine() {
        this.delta = 0;
        this.startTime = window.performance.now();
    }
    Engine.prototype.requestFrame = function (callback) {
        this.aid = window.requestAnimationFrame(callback);
    };
    Engine.prototype.cancelFrame = function (id) {
        window.cancelAnimationFrame(id);
    };
    Engine.prototype.loop = function (loopTime) {
        var _this = this;
        this.game.update(this.delta);
        this.game.rootNode.nupdate(this.delta);
        this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.config.width, this.config.height);
        this.game.draw(this.ctx);
        this.game.rootNode.ndraw(this.ctx);
        this.game.drawUi(this.ctx);
        this.delta = (loopTime - this.startTime) / 1000;
        this.startTime = loopTime;
        this.requestFrame(function (frameDelta) { _this.loop(frameDelta); });
    };
    Engine.prototype.start = function (game, config) {
        var _this = this;
        this.game = game;
        this.game.engine = this;
        this.config = config;
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.game.init();
        this.requestFrame(function (frameDelta) { _this.loop(frameDelta); });
    };
    return Engine;
}());
exports.Engine = Engine;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(8);
var vector_1 = __webpack_require__(2);
var sprite_1 = __webpack_require__(1);
var input_1 = __webpack_require__(3);
var node_1 = __webpack_require__(0);
var title_1 = __webpack_require__(9);
var controls_1 = __webpack_require__(12);
var gameover_1 = __webpack_require__(15);
var pause_1 = __webpack_require__(18);
var scoreboard_1 = __webpack_require__(21);
var player_1 = __webpack_require__(25);
var bgFactories_1 = __webpack_require__(27);
var bgClouds_1 = __webpack_require__(30);
var platform_1 = __webpack_require__(34);
var obstacle_1 = __webpack_require__(36);
var powerdrop_1 = __webpack_require__(48);
var darkness_1 = __webpack_require__(51);
var LD39 = (function (_super) {
    __extends(LD39, _super);
    function LD39() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastKey = {
            'go': false,
            'pause': false
        };
        return _this;
    }
    LD39.prototype.init = function () {
        this.state = 'menu';
        this.animating = 'in';
        this.title = new title_1.Title();
        this.title.position.y = 200;
        this.controls = new controls_1.Controls();
        this.controls.position.x = 350;
        this.gameover = new gameover_1.GameOver();
        this.gameover.position.y = 250;
        this.pause = new pause_1.Pause();
        this.scoreboard = new scoreboard_1.Scoreboard(this);
        this.bgSprite = new sprite_1.Sprite(__webpack_require__(52));
        this.player = new player_1.Player(this);
        this.player.position = new vector_1.Vector(125, -305);
        this.player.lockInput = true;
        this.distance = 0;
        this.difficulty = 0.35;
        this.difficultySpeed = 1;
        this.difficultyTimer = 30;
        this.difficultyRate = 1 / this.difficultyTimer;
        this.tickTime = 0;
        this.obstacleTypeI = this.obstacleTypeG();
        this.obstacleNode = new node_1.Node();
        this.ticksWithoutObstacle = 0;
        this.powerLevel = 1;
        this.powerTick = 0;
        this.powerNode = new node_1.Node();
        this.bgClouds1 = new bgClouds_1.BgClouds(this.player, 0, '');
        this.bgClouds2 = new bgClouds_1.BgClouds(this.player, 800, '2');
        this.bgFactories1 = new bgFactories_1.BgFactories(this);
        this.bgFactories2 = new bgFactories_1.BgFactories(this);
        this.bgFactories2.position = new vector_1.Vector(800, 0);
        this.platform1 = new platform_1.Platform(this.player);
        this.platform2 = new platform_1.Platform(this.player);
        this.platform2.position = new vector_1.Vector(800, 0);
        this.darkness = new darkness_1.Darkness(this);
        this.neonNode = new node_1.Node();
        this.blackout = false;
        this.blackoutTimer = 0;
        this.frontNode = new node_1.Node();
        // Add in order of render (back to front)
        this.rootNode.addChild(this.bgClouds1);
        this.rootNode.addChild(this.bgClouds2);
        this.rootNode.addChild(this.bgFactories1);
        this.rootNode.addChild(this.bgFactories2);
        this.rootNode.addChild(this.platform1);
        this.rootNode.addChild(this.platform2);
        this.rootNode.addChild(this.obstacleNode);
        this.rootNode.addChild(this.powerNode);
        this.rootNode.addChild(this.player);
        this.rootNode.addChild(this.frontNode);
        this.rootNode.addChild(this.darkness);
        this.rootNode.addChild(this.neonNode);
        this.rootNode.addChild(this.title);
        this.rootNode.addChild(this.controls);
        this.dTime = 0;
        this.dFps = 0;
        this.dSFps = 0;
    };
    LD39.prototype.reset = function () {
        this.title.position.y = 200;
        this.controls.position.x = 350;
        this.gameover.position.y = 250;
        this.difficulty = 0.35;
        this.difficultySpeed = 1;
        this.difficultyTimer = 30;
        this.difficultyRate = 1 / this.difficultyTimer;
        this.tickTime = 0;
        this.obstacleTypeI = this.obstacleTypeG();
        this.ticksWithoutObstacle = 0;
        this.powerLevel = 1;
        this.powerTick = 0;
        this.blackout = false;
        this.blackoutTimer = 0;
        this.darkness.level = 1 - this.powerLevel;
        this.distance = 0;
        this.player.position = new vector_1.Vector(125, -305);
        this.bgFactories1.position = new vector_1.Vector();
        this.bgFactories2.position = new vector_1.Vector(800, 0);
        this.platform1.position = new vector_1.Vector();
        this.platform2.position = new vector_1.Vector(800, 0);
        this.obstacleNode.children = [];
        this.obstacleNode.doUpdate = true;
        this.powerNode.children = [];
        this.neonNode.children = [];
        this.frontNode.children = [];
        this.rootNode.globalPosition = new vector_1.Vector();
    };
    LD39.prototype.update = function (delta) {
        this.dTime += delta;
        this.dFps++;
        if (this.dTime >= 1) {
            this.dSFps = this.dFps;
            this.dFps = 0;
            this.dTime %= 1;
        }
        switch (this.state) {
            case 'game': {
                var nextDistance = (800 * this.difficultySpeed) * delta;
                this.distance += nextDistance / 100;
                this.player.position.add(new vector_1.Vector(nextDistance, 0));
                this.rootNode.globalPosition = new vector_1.Vector(this.player.position.x, 0).mul(-1).add(new vector_1.Vector(125, 0));
                this.difficultyTimer -= delta;
                if (this.difficultyTimer <= 0) {
                    this.difficultyTimer = (Math.random() * 10) + 30;
                    this.difficultyRate = 1 / this.difficultyTimer;
                }
                this.difficulty += 0.1 * this.difficultyRate * delta;
                this.difficultySpeed += 0.2 * this.difficultyRate * delta;
                this.tickTime += delta;
                if (this.tickTime >= (0.6 * this.difficultySpeed)) {
                    if (this.powerTick == 20) {
                        this.addPowerDrop();
                        this.powerTick = 0;
                    }
                    else {
                        if (Math.random() <= this.difficulty) {
                            this.addObstacle();
                        }
                        else {
                            this.ticksWithoutObstacle++;
                            if ((1 / this.ticksWithoutObstacle) <= this.difficulty) {
                                this.addObstacle();
                                this.ticksWithoutObstacle = 0;
                            }
                        }
                    }
                    this.powerTick++;
                    this.tickTime = 0;
                }
                for (var _i = 0, _a = this.obstacleNode.children; _i < _a.length; _i++) {
                    var obstacle = _a[_i];
                    var dist = obstacle.position.x - this.player.position.x;
                    if (dist <= -200) {
                        this.obstacleNode.removeChild(obstacle);
                    }
                }
                for (var _b = 0, _c = this.powerNode.children; _b < _c.length; _b++) {
                    var powerDrop = _c[_b];
                    var dist = powerDrop.position.x - this.player.position.x;
                    if (dist <= -200) {
                        this.powerNode.removeChild(powerDrop);
                    }
                }
                this.powerLevel -= 0.02 * delta;
                this.darkness.level = 1 - this.powerLevel;
                if (this.powerLevel >= 0.5) {
                    this.blackout = false;
                }
                else if (this.powerLevel <= 0.1) {
                    this.blackout = true;
                }
                else {
                    this.blackoutTimer -= delta;
                    if (this.blackoutTimer <= 0) {
                        this.blackout = !this.blackout;
                        this.blackoutTimer = Math.random() * 0.5;
                    }
                }
                if (this.powerLevel <= 0) {
                    this.gameOver();
                }
                this.scoreboard.isOn = !this.blackout;
                this.bgFactories1.isOn = !this.blackout;
                this.bgFactories2.isOn = !this.blackout;
                for (var _d = 0, _e = this.neonNode.children; _d < _e.length; _d++) {
                    var neon = _e[_d];
                    neon.isOn = !this.blackout;
                }
                if (input_1.input.isDown('Escape') && !this.lastKey['pause']) {
                    this.lastKey['pause'] = true;
                    this.state = 'pause';
                    this.pause.position.x = -this.rootNode.globalPosition.x;
                    this.rootNode.addChild(this.pause);
                    this.player.doUpdate = false;
                    this.bgFactories1.parallax = false;
                    this.bgFactories2.parallax = false;
                }
                if (!input_1.input.isDown('Escape')) {
                    this.lastKey['pause'] = false;
                }
                break;
            }
            case 'pause': {
                if (input_1.input.isDown('Escape') && !this.lastKey['pause']) {
                    this.lastKey['pause'] = true;
                    this.state = 'game';
                    this.rootNode.removeChild(this.pause);
                    this.player.doUpdate = true;
                    this.bgFactories1.parallax = true;
                    this.bgFactories2.parallax = true;
                }
                if (!input_1.input.isDown('Escape')) {
                    this.lastKey['pause'] = false;
                }
                break;
            }
            case 'menu': {
                if (this.animating === 'out') {
                    if (this.title.position.y > 200) {
                        this.state = 'game';
                        this.rootNode.removeChild(this.title);
                        this.rootNode.removeChild(this.controls);
                        this.player.lockInput = false;
                        this.player.animating = 'run';
                        this.rootNode.addChild(this.scoreboard);
                        this.bgFactories1.parallax = true;
                        this.bgFactories2.parallax = true;
                    }
                    else {
                        this.title.position.y += 8;
                        this.controls.position.x += 14;
                    }
                }
                else {
                    if (this.title.position.y > 0) {
                        this.title.position.y -= 8;
                    }
                    if (this.controls.position.x > 0) {
                        this.controls.position.x -= 14;
                    }
                }
                if (input_1.input.isDown('Space') && !this.lastKey['go']) {
                    this.lastKey['go'] = true;
                    this.animating = 'out';
                }
                if (!input_1.input.isDown('Space')) {
                    this.lastKey['go'] = false;
                }
                break;
            }
            case 'gameover': {
                if (this.animating === 'out') {
                    if (this.gameover.position.y > 250) {
                        this.state = 'menu';
                        this.animating = 'in';
                        this.rootNode.removeChild(this.gameover);
                        this.rootNode.removeChild(this.scoreboard);
                        this.rootNode.addChild(this.title);
                        this.rootNode.addChild(this.controls);
                        this.player.animating = 'idle';
                        this.player.resetAnimations();
                        this.reset();
                    }
                    else {
                        this.gameover.position.y += 8;
                    }
                }
                else {
                    if (this.gameover.position.y > 0) {
                        this.gameover.position.y -= 8;
                    }
                }
                if (input_1.input.isDown('Space') && !this.lastKey['go']) {
                    this.lastKey['go'] = true;
                    this.animating = 'out';
                }
                if (!input_1.input.isDown('Space')) {
                    this.lastKey['go'] = false;
                }
                break;
            }
        }
    };
    LD39.prototype.gameOver = function () {
        this.state = 'gameover';
        this.obstacleNode.doUpdate = false;
        this.player.lockInput = true;
        this.player.animating = 'death';
        this.animating = 'in';
        this.gameover.position.x = -this.rootNode.globalPosition.x;
        this.rootNode.addChild(this.gameover);
        this.bgFactories1.parallax = false;
        this.bgFactories2.parallax = false;
    };
    LD39.prototype.collectPower = function (powerDrop) {
        this.powerLevel += 0.4;
        if (this.powerLevel > 1) {
            this.powerLevel = 1;
        }
        this.powerNode.removeChild(powerDrop);
        this.neonNode.removeChild(powerDrop.neon);
    };
    LD39.prototype.addPowerDrop = function () {
        var powerDrop = new powerdrop_1.PowerDrop(this);
        powerDrop.position.x = this.player.position.x + 800;
        powerDrop.position.y = -100;
        powerDrop.startY = -100;
        this.powerNode.addChild(powerDrop);
    };
    LD39.prototype.addObstacle = function () {
        var obstacleType = this.obstacleTypeI.next().value;
        var obstacle = new obstacle_1.Obstacle(this, obstacleType);
        obstacle.position.x = this.player.position.x + 800;
        this.obstacleNode.addChild(obstacle);
    };
    LD39.prototype.obstacleTypeG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values([
                        1, 1, 2, 1, 2, 3, 2, 1, 4
                    ])];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (false) return [3 /*break*/, 4];
                    return [4 /*yield*/, Math.ceil(Math.random() * 4)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    };
    LD39.prototype.draw = function (ctx) {
        ctx.drawImage(this.bgSprite.get(), 0, 0, this.engine.config.width, this.engine.config.height);
    };
    LD39.prototype.drawUi = function (ctx) {
        // ctx.font = '10px sans';
        //
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(0, 0    , 800, 1);
        // ctx.fillRect(0, 101.6, 800, 1);
        // ctx.fillRect(0, 203.8, 800, 1);
        // ctx.fillRect(0, 305  , 800, 1);
        // ctx.fillRect(0, 406.6, 800, 1);
        //
        // const messages = [
        //     'Debug',
        //     'fps: ' + this.dSFps,
        //     'sta: ' + this.state,
        //     'obs: ' + this.obstacleNode.children.length,
        //     'dif: ' + this.difficulty,
        //     'spd: ' + this.difficultySpeed,
        //     'pwr: ' + this.powerLevel
        // ];
        //
        // ctx.fillStyle = 'rgba(192, 192, 192, 0.8)';
        // ctx.fillRect(0, 0, 150, (messages.length * 15) + 3);
        //
        // ctx.fillStyle = '#000000';
        // for(let r = 0;r < messages.length;r++) {
        //     ctx.fillText(messages[r], 3, 13 + (r * 15));
        // }
    };
    return LD39;
}(game_1.Game));
exports.LD39 = LD39;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var Game = (function () {
    function Game() {
        this.rootNode = new node_1.Node();
    }
    return Game;
}());
exports.Game = Game;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var Title = (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super.call(this) || this;
        _this.isOn = true;
        _this.timer = 0;
        _this.spriteOn = new sprite_1.Sprite(__webpack_require__(10));
        _this.spriteOff = new sprite_1.Sprite(__webpack_require__(11));
        return _this;
    }
    Title.prototype.update = function (delta) {
        if (this.timer <= 0) {
            if (this.isOn) {
                this.timer = (Math.random() * 0.4) + 0.1;
            }
            else {
                this.timer = (Math.random() * 2.5) + 0.5;
            }
            this.isOn = !this.isOn;
        }
        this.timer -= delta;
    };
    Title.prototype.draw = function (ctx) {
        if (this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
        else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    };
    return Title;
}(node_1.Node));
exports.Title = Title;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b1b6b5191fb12e252688ae94c1841d21.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1b2f8899357193f236e1574d01daac45.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var Controls = (function (_super) {
    __extends(Controls, _super);
    function Controls() {
        var _this = _super.call(this) || this;
        _this.isOn = true;
        _this.timer = 0;
        _this.spriteOn = new sprite_1.Sprite(__webpack_require__(13));
        _this.spriteOff = new sprite_1.Sprite(__webpack_require__(14));
        return _this;
    }
    Controls.prototype.update = function (delta) {
        if (this.timer <= 0) {
            if (this.isOn) {
                this.timer = (Math.random() * 0.4) + 0.1;
            }
            else {
                this.timer = (Math.random() * 2.5) + 0.5;
            }
            this.isOn = !this.isOn;
        }
        this.timer -= delta;
    };
    Controls.prototype.draw = function (ctx) {
        if (this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
        else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    };
    return Controls;
}(node_1.Node));
exports.Controls = Controls;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8a41f366bc365f14f62d8660787f9891.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7ab2cfd915147f801c4e3f9c3da13b1f.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.isOn = true;
        _this.timer = 0;
        _this.spriteOn = new sprite_1.Sprite(__webpack_require__(16));
        _this.spriteOff = new sprite_1.Sprite(__webpack_require__(17));
        return _this;
    }
    GameOver.prototype.update = function (delta) {
        if (this.timer <= 0) {
            if (this.isOn) {
                this.timer = (Math.random() * 0.4) + 0.1;
            }
            else {
                this.timer = (Math.random() * 2.5) + 0.5;
            }
            this.isOn = !this.isOn;
        }
        this.timer -= delta;
    };
    GameOver.prototype.draw = function (ctx) {
        if (this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
        else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    };
    return GameOver;
}(node_1.Node));
exports.GameOver = GameOver;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ae50dd424cf2d952dbd5e8f4af87dde7.png";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e2b96b2e31db4266e52211ad83739770.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var Pause = (function (_super) {
    __extends(Pause, _super);
    function Pause() {
        var _this = _super.call(this) || this;
        _this.isOn = true;
        _this.timer = 0;
        _this.spriteOn = new sprite_1.Sprite(__webpack_require__(19));
        _this.spriteOff = new sprite_1.Sprite(__webpack_require__(20));
        return _this;
    }
    Pause.prototype.update = function (delta) {
        if (this.timer <= 0) {
            if (this.isOn) {
                this.timer = (Math.random() * 0.4) + 0.1;
            }
            else {
                this.timer = (Math.random() * 2.5) + 0.5;
            }
            this.isOn = !this.isOn;
        }
        this.timer -= delta;
    };
    Pause.prototype.draw = function (ctx) {
        if (this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
        else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    };
    return Pause;
}(node_1.Node));
exports.Pause = Pause;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "999e934a4bf68fe85b51aed4eebdcbd2.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c81a688a2f9a96abcb10581f9a958c2e.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var Scoreboard = (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.isOn = true;
        _this.bgSprite = new sprite_1.Sprite(__webpack_require__(22));
        _this.barSpriteOn = new sprite_1.Sprite(__webpack_require__(23));
        _this.barSpriteOff = new sprite_1.Sprite(__webpack_require__(24));
        return _this;
    }
    Scoreboard.prototype.update = function (delta) {
        this.position.x = -this.game.rootNode.globalPosition.x;
    };
    Scoreboard.prototype.draw = function (ctx) {
        ctx.drawImage(this.bgSprite.get(), 0, 0, 800, 500);
        var width = 6 + (50 * this.game.powerLevel);
        if (this.isOn) {
            ctx.drawImage(this.barSpriteOn.get(), 0, 0, width, 100, 0, 0, width * 5, 500);
        }
        else {
            ctx.drawImage(this.barSpriteOff.get(), 0, 0, width, 100, 0, 0, width * 5, 500);
        }
        ctx.font = '46px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.floor(this.game.distance).toString().split('.')[0] + 'm', 300, 476);
    };
    return Scoreboard;
}(node_1.Node));
exports.Scoreboard = Scoreboard;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "40dc5617648276bcbce15b5a11275d10.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c0d25438caed30e28a248cefd556b0c2.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0a4331e1809254e9c06b2f5d2e7ba279.png";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var vector_1 = __webpack_require__(2);
var input_1 = __webpack_require__(3);
var sprite_1 = __webpack_require__(1);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        var _this = _super.call(this) || this;
        _this.lastY = null;
        _this.jumpTime = null;
        _this.slideTime = null;
        _this.lastKey = {
            'jump': false,
            'slide': false
        };
        _this.jumpVel = 2000;
        _this.game = game;
        _this.col = new vector_1.Vector();
        _this.colSize = new vector_1.Vector();
        _this.lockInput = false;
        _this.animating = 'idle';
        _this.frameTick = 0;
        _this.frameLength = 0.1;
        _this.frameId = 2;
        _this.resetAnimations();
        _this.sprite = new sprite_1.Sprite(__webpack_require__(26));
        return _this;
    }
    Player.prototype.update = function (delta) {
        this.col = vector_1.Vector.clone(this.position);
        this.colSize = new vector_1.Vector(75, 100);
        var speed = 1000 * delta;
        if (!this.lockInput) {
            if ((input_1.input.isDown('KeyW') || input_1.input.isDown('ArrowUp')) && !this.lastKey['jump']) {
                this.lastKey['jump'] = true;
                if (this.jumpTime === null) {
                    this.jumpTime = 0;
                    this.animating = 'jump';
                    this.resetAnimations();
                }
            }
            if (!(input_1.input.isDown('KeyW') || input_1.input.isDown('ArrowUp'))) {
                this.lastKey['jump'] = false;
            }
            if ((input_1.input.isDown('KeyS') || input_1.input.isDown('ArrowDown')) && !this.lastKey['slide']) {
                this.lastKey['slide'] = true;
                if (this.slideTime === null) {
                    this.slideTime = 0;
                    this.animating = 'slide';
                    this.resetAnimations();
                }
            }
            if (!(input_1.input.isDown('KeyS') || input_1.input.isDown('ArrowDown'))) {
                this.lastKey['slide'] = false;
            }
        }
        this.position.y = this.jump(delta);
        if (this.slideTime !== null) {
            this.slideTime += delta;
            this.col.y -= 25;
            this.colSize.y = 50;
            if (this.slideTime >= 0.4) {
                this.slideTime = null;
            }
        }
        this.frameTick += delta;
        if (this.frameTick >= this.frameLength) {
            this.frameId++;
            this.onFrameTick();
            this.frameTick = 0;
        }
    };
    Player.prototype.onFrameTick = function () {
        switch (this.animating) {
            case 'run': {
                this.frameLength = 0.067 * this.game.difficultySpeed;
                this.frameId = this.runI.next().value;
                break;
            }
            case 'jump': {
                this.frameLength = 0.08;
                this.frameId = this.jumpI.next().value;
                if (this.frameId == undefined) {
                    this.animating = 'run';
                    this.resetAnimations();
                }
                break;
            }
            case 'slide': {
                this.frameLength = 0.08;
                this.frameId = this.slideI.next().value;
                if (this.frameId == undefined) {
                    this.animating = 'run';
                    this.resetAnimations();
                }
                break;
            }
            case 'idle': {
                this.frameLength = 0.25;
                this.frameId = this.idleI.next().value;
                break;
            }
            case 'death': {
                this.frameLength = 0.12;
                this.frameId = this.deathI.next().value;
                break;
            }
        }
    };
    Player.prototype.resetAnimations = function () {
        this.runI = this.runG();
        this.jumpI = this.jumpG();
        this.slideI = this.slideG();
        this.idleI = this.idleG();
        this.deathI = this.deathG();
        this.onFrameTick();
    };
    Player.prototype.runG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (false) return [3 /*break*/, 2];
                    return [5 /*yield**/, __values([2, 3, 4, 3, 2, 1, 0, 1])];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    Player.prototype.jumpG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values([5, 6])];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(this.position.y > this.lastY)) return [3 /*break*/, 4];
                    return [4 /*yield*/, 7];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [5 /*yield**/, __values([8, 9])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    Player.prototype.slideG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values([10, 11])];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(this.slideTime !== null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, 12];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [5 /*yield**/, __values([13, 14])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    Player.prototype.idleG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (false) return [3 /*break*/, 2];
                    return [5 /*yield**/, __values([15, 16, 17, 18])];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    Player.prototype.deathG = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values([20, 21, 22, 23])];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (false) return [3 /*break*/, 4];
                    return [4 /*yield*/, 24];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    };
    Player.prototype.jump = function (delta) {
        if (this.lastY === null) {
            this.lastY = this.position.y;
        }
        if (this.jumpTime === null) {
            return this.lastY;
        }
        var y = this.lastY + ((this.jumpVel * this.jumpTime) - (0.5 * (this.jumpVel * 3.6) * this.jumpTime * this.jumpTime));
        if (y < this.lastY) {
            y = this.lastY;
            this.jumpTime = null;
            this.lastY = null;
        }
        else {
            this.jumpTime += delta;
        }
        return y;
    };
    Player.prototype.draw = function (ctx) {
        var x = this.frameId % 5;
        var y = Math.floor(this.frameId / 5);
        ctx.drawImage(this.sprite.get(), (x * 15), (y * 25), 15, 25, this.globalPosition.x, -this.globalPosition.y - 25, 75, 125);
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        // ctx.fillRect(this.globalPosition.x, -this.globalPosition.y, this.colSize.x, this.colSize.y);
    };
    return Player;
}(node_1.Node));
exports.Player = Player;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "33093a16c6b401a39ed4e259f475941a.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var vector_1 = __webpack_require__(2);
var sprite_1 = __webpack_require__(1);
var BgFactories = (function (_super) {
    __extends(BgFactories, _super);
    function BgFactories(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.player = game.player;
        _this.isOn = true;
        _this.parallax = false;
        _this.spriteOn = new sprite_1.Sprite(__webpack_require__(28));
        _this.spriteOff = new sprite_1.Sprite(__webpack_require__(29));
        return _this;
    }
    BgFactories.prototype.update = function (delta) {
        if (this.parallax) {
            this.position.x += (650 * this.game.difficultySpeed) * delta;
        }
        var dist = this.position.x - this.player.position.x;
        if (dist <= -800 - 125) {
            this.position.add(new vector_1.Vector(1600, 0));
        }
    };
    BgFactories.prototype.draw = function (ctx) {
        if (this.isOn) {
            ctx.drawImage(this.spriteOn.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
        else {
            ctx.drawImage(this.spriteOff.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
        }
    };
    return BgFactories;
}(node_1.Node));
exports.BgFactories = BgFactories;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4acba708fdc7fe7c63f255d6963ea3de.png";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c2916726001f29aa4b3c0bed99462109.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var vector_1 = __webpack_require__(2);
var sprite_1 = __webpack_require__(1);
var BgClouds = (function (_super) {
    __extends(BgClouds, _super);
    function BgClouds(player, foff, ed) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.offset = 125;
        _this.foff = foff;
        _this.sprite = new sprite_1.Sprite(__webpack_require__(31)("./clouds" + ed + '.png'));
        return _this;
    }
    BgClouds.prototype.update = function (delta) {
        this.position.x = this.player.position.x + this.foff;
        this.offset += 0.2;
        this.position.x -= this.offset;
        var dist = this.position.x - this.player.position.x;
        if (dist <= -800 - 125) {
            this.position.add(new vector_1.Vector(1600, 0));
            this.offset = this.foff + dist + 125;
        }
    };
    BgClouds.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
    };
    return BgClouds;
}(node_1.Node));
exports.BgClouds = BgClouds;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./clouds.png": 32,
	"./clouds2.png": 33
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "97a9a507bb399bbcf6c35c2925ca1ecd.png";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "307054a314ef9a817b4c5b02d41abfd0.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var vector_1 = __webpack_require__(2);
var sprite_1 = __webpack_require__(1);
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(player) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.sprite = new sprite_1.Sprite(__webpack_require__(35));
        return _this;
    }
    Platform.prototype.update = function (delta) {
        var dist = this.position.x - this.player.position.x;
        if (dist <= -800 - 125) {
            this.position.add(new vector_1.Vector(1600, 0));
        }
    };
    Platform.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 800, 500);
    };
    return Platform;
}(node_1.Node));
exports.Platform = Platform;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d0cb593263b1bb393251770ad611ba73.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var neon_1 = __webpack_require__(4);
var front_1 = __webpack_require__(37);
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(game, obstacleType) {
        var _this = _super.call(this) || this;
        _this.collisions = {
            'top': false,
            'up': false,
            'mid': false,
            'bottom': false
        };
        _this.game = game;
        _this.player = game.player;
        _this.position.y = -15;
        _this.sprite = new sprite_1.Sprite('');
        _this.obstacleType = obstacleType;
        switch (_this.obstacleType) {
            case 1: {
                _this.sprite = new sprite_1.Sprite(__webpack_require__(38));
                _this.game.neonNode.addChild(new neon_1.Neon(_this, __webpack_require__(39), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.loseOn = {
                    'top': false,
                    'up': false,
                    'mid': false,
                    'bottom': true
                };
                break;
            }
            case 2: {
                _this.sprite = new sprite_1.Sprite(__webpack_require__(40));
                _this.game.neonNode.addChild(new neon_1.Neon(_this, __webpack_require__(41), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.game.frontNode.addChild(new front_1.Front(_this, __webpack_require__(42), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.loseOn = {
                    'top': true,
                    'up': true,
                    'mid': false,
                    'bottom': false
                };
                break;
            }
            case 3: {
                _this.sprite = new sprite_1.Sprite(__webpack_require__(43));
                _this.game.neonNode.addChild(new neon_1.Neon(_this, __webpack_require__(44), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.loseOn = {
                    'top': false,
                    'up': false,
                    'mid': true,
                    'bottom': true
                };
                break;
            }
            case 4: {
                _this.sprite = new sprite_1.Sprite(__webpack_require__(45));
                _this.game.neonNode.addChild(new neon_1.Neon(_this, __webpack_require__(46), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.game.frontNode.addChild(new front_1.Front(_this, __webpack_require__(47), { offsetX: 0, offsetY: 0, width: 95, height: 400 }));
                _this.loseOn = {
                    'top': true,
                    'up': true,
                    'mid': true,
                    'bottom': false
                };
                break;
            }
        }
        return _this;
    }
    Obstacle.prototype.update = function (delta) {
        // Hit range
        // top    0     , -101.6
        // up     -101.6, -203.8
        // mid    -203.8, -305
        // bottom -305  , -406.6
        // Check for domain
        if (((this.player.col.x >= this.position.x) && (this.player.col.x <= this.position.x + 75)) ||
            ((this.player.col.x + this.player.colSize.x >= this.position.x) && (this.player.col.x + this.player.colSize.x <= this.position.x + 75))) {
            if (((this.player.col.y <= 0) && (this.player.col.y >= -101.6)) ||
                ((this.player.col.y - this.player.colSize.y <= 0) && (this.player.col.y - this.player.colSize.y >= -101.6))) {
                this.collisions['top'] = true;
            }
            if (((this.player.col.y <= -101.6) && (this.player.col.y >= -203.8)) ||
                ((this.player.col.y - this.player.colSize.y <= -101.6) && (this.player.col.y - this.player.colSize.y >= -203.8))) {
                this.collisions['up'] = true;
            }
            if (((this.player.col.y <= -203.8) && (this.player.col.y >= -305)) ||
                ((this.player.col.y - this.player.colSize.y <= -203.8) && (this.player.col.y - this.player.colSize.y >= -305))) {
                this.collisions['mid'] = true;
            }
            if (((this.player.col.y <= -305) && (this.player.col.y >= -406.6)) ||
                ((this.player.col.y - this.player.colSize.y <= -305) && (this.player.col.y - this.player.colSize.y >= -406.6))) {
                this.collisions['bottom'] = true;
            }
            if ((this.loseOn['top'] && this.collisions['top']) ||
                (this.loseOn['up'] && this.collisions['up']) ||
                (this.loseOn['mid'] && this.collisions['mid']) ||
                (this.loseOn['bottom'] && this.collisions['bottom'])) {
                this.game.gameOver();
            }
        }
    };
    Obstacle.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 95, 400);
        // let i = 0;
        // for(const collision in this.collisions) {
        //     if(this.loseOn[collision]) {
        //         if(this.collisions[collision]) {
        //             ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
        //         } else {
        //             ctx.fillStyle = 'rgba(0, 0, 255, 0.4)';
        //         }
        //         ctx.fillRect(this.globalPosition.x + 10, -this.globalPosition.y + (i * 100), 15 * 5, 20 * 5);
        //     }
        //     i++;
        // }
    };
    return Obstacle;
}(node_1.Node));
exports.Obstacle = Obstacle;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(2);
var Front = (function (_super) {
    __extends(Front, _super);
    function Front(owner, src, drawOptions) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.drawOptions = drawOptions;
        _this.sprite = new sprite_1.Sprite(src);
        return _this;
    }
    Front.prototype.update = function (delta) {
        this.position = vector_1.Vector.clone(this.owner.position);
    };
    Front.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x + this.drawOptions.offsetX, -this.globalPosition.y + this.drawOptions.offsetY, this.drawOptions.width, this.drawOptions.height);
    };
    return Front;
}(node_1.Node));
exports.Front = Front;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5f6d97f7e011662318e0d3641fa78602.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "040a13e70851166f88da97bd60103df0.png";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "083a9cc9cf2e032448de755594b44cf0.png";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1b93fe79b9049213220a26794aa93c1a.png";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ed810aa77bb535f73a368e060fac6233.png";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3239e7aee64b39b08cc7dad4abd6dd4d.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b9e8b1c6e040acd3ebbaeaa27dc7f2dd.png";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a8e1324b518fb23636be862ff086c504.png";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8c22eb6c33038846a438ef4590a78554.png";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "30b92ffc43659c4671a38da69bacbbfc.png";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var sprite_1 = __webpack_require__(1);
var neon_1 = __webpack_require__(4);
var PowerDrop = (function (_super) {
    __extends(PowerDrop, _super);
    function PowerDrop(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.player = game.player;
        _this.sprite = new sprite_1.Sprite(__webpack_require__(49));
        _this.neon = new neon_1.Neon(_this, __webpack_require__(50), { offsetX: 0, offsetY: 0, width: 75, height: 75 });
        _this.neon.alwaysOn = true;
        _this.game.neonNode.addChild(_this.neon);
        _this.time = Math.random();
        return _this;
    }
    PowerDrop.prototype.update = function (delta) {
        this.time += delta;
        this.position.y = this.startY + (Math.sin(2 * Math.PI * this.time) * 20);
        if (((this.player.col.x >= this.position.x) && (this.player.col.x <= this.position.x + 75)) ||
            ((this.player.col.x + this.player.colSize.x >= this.position.x) && (this.player.col.x + this.player.colSize.x <= this.position.x + 75))) {
            if (((this.player.col.y <= this.position.y) && (this.player.col.y >= this.position.y - 75)) ||
                ((this.player.col.y - this.player.colSize.y <= this.position.y) && (this.player.col.y - this.player.colSize.y >= this.position.y - 75))) {
                this.game.collectPower(this);
            }
        }
    };
    PowerDrop.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite.get(), this.globalPosition.x, -this.globalPosition.y, 75, 75);
    };
    return PowerDrop;
}(node_1.Node));
exports.PowerDrop = PowerDrop;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f6cb4ab9758ac4176352bc50c5065025.png";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2c451ca35b8e4212ecb8a4c9a5f89a76.png";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var Darkness = (function (_super) {
    __extends(Darkness, _super);
    function Darkness(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.level = 0;
        return _this;
    }
    Darkness.prototype.update = function (delta) {
        this.position.x = -this.game.rootNode.globalPosition.x;
    };
    Darkness.prototype.draw = function (ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, ' + (this.level * 0.8) + ')';
        ctx.fillRect(0, 0, 800, 500);
    };
    return Darkness;
}(node_1.Node));
exports.Darkness = Darkness;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9419d6527071dc02863cc0b66fb2fe1c.png";

/***/ })
/******/ ]);