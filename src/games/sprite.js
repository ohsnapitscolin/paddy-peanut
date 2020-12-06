import { Sprite as PixiSprite, Text as PixiText } from "pixi.js";

export default class Sprite {
  constructor(texture, options = {}, text) {
    if (text) {
      this.sprite = new PixiText(text);
    } else {
      this.sprite = new PixiSprite(texture);
    }

    const { x = 0, y = 0, width, height, interactive = false } = options;

    this.sprite.x = x;
    this.sprite.y = y;

    if (width && height) {
      this.sprite.width = width;
      this.sprite.height = height;
    } else if (width) {
      const delta = width / this.sprite.width;
      this.sprite.width = width;
      this.sprite.height *= delta;
    } else if (height) {
      const delta = height / this.sprite.height;
      this.sprite.height = height;
      this.sprite.width *= delta;
    }

    if (interactive) {
      this.sprite.interactive = true;
    }

    this.sprite.on("mousedown", this._handleClick.bind(this));
    this.sprite.on("touchstart", this._handleClick.bind(this));

    this.sprite.vx = 0;
    this.sprite.vy = 0;

    this.target = {
      x: undefined,
      y: undefined,
    };
  }

  onClick(callback) {
    this.onClickCallback = callback;
  }

  getSprite() {
    return this.sprite;
  }

  getPosition() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  draw() {
    // Check if the sprite has reached the targeted X position.
    if (
      (this.sprite.vx <= 0 && this.target.x >= this.sprite.x) ||
      (this.sprite.vx >= 0 && this.target.x <= this.sprite.x)
    ) {
      this.sprite.x = this.target.x;
      this.sprite.vx = 0;
      this.target.x = undefined;
    }

    // Check if the sprite has reached the targeted Y position.
    if (
      (this.sprite.vy <= 0 && this.target.y >= this.sprite.y) ||
      (this.sprite.vy >= 0 && this.target.y <= this.sprite.y)
    ) {
      this.sprite.y = this.target.y;
      this.sprite.vy = 0;
      this.target.y = undefined;
    }

    if (
      this.target.x === undefined &&
      this.target.y === undefined &&
      this.resolver
    ) {
      const resolver = this.resolver;
      this.resolver = null;
      resolver();
    }

    this.sprite.x += this.sprite.vx;
    this.sprite.y += this.sprite.vy;
  }

  move(options) {
    const {
      x = this.sprite.x,
      y = this.sprite.y,
      dx,
      dy,
      ms = 500,
      speed,
    } = options;

    if (dx) {
      this.target.x = this.sprite.x + dx;
    } else {
      this.target.x = x;
    }

    if (dy) {
      this.target.y = this.sprite.y + dy;
    } else {
      this.target.y = y;
    }

    if (speed) {
      this.sprite.vx = speed;
      this.sprite.vy = speed;
    } else if (!ms) {
      this.sprite.x = this.target.x;
      this.sprite.y = this.target.y;
    } else {
      this.sprite.vx = (this.target.x - this.sprite.x) / this._msToFrames(ms);
      this.sprite.vy = (this.target.y - this.sprite.y) / this._msToFrames(ms);
    }

    return new Promise(resolve => {
      this.resolver = resolve;
    });
  }

  _msToFrames(ms) {
    return (ms * 60) / 1000;
  }

  _handleClick() {
    if (this.onClickCallback) {
      this.onClickCallback(this);
    }
  }

  hide() {
    this.sprite.visible = false;
  }

  show() {
    this.sprite.visible = true;
  }

  setInteractive(interactive) {
    this.sprite.interactive = interactive;
  }
}
