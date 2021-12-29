import Sprite from "../sprite";

const JUMP_FORCE = 6;
const GRAVITY = 0.2;
const TERMINAL = 8.0;

export default class Jumper {
  constructor(texture, [x, y, width]) {
    this.initialY = x;
    this.initialY = y;

    this.velocityY = 0;
    this.velocityX = 0;

    this.sprite = new Sprite(texture, { x, y, width });
  }

  getSprite() {
    return this.sprite.getSprite();
  }

  reset() {
    this.sprite.move({
      x: this.initialX,
      y: this.initialY,
      ms: null,
    });
  }

  jump() {
    if (this.y !== this.initialY) return;
    this.velocityY = -1 * JUMP_FORCE;
  }

  move() {
    // Vertical Movement
    if (this.velocityY < TERMINAL) {
      this.velocityY += GRAVITY;
    } else {
      this.velocityY = TERMINAL;
    }

    this.sprite.move({
      dy: this.velocityY,
      ms: null,
    });

    if (this.y > this.initialY) {
      this.sprite.move({
        y: this.initialY,
        ms: null,
      });
      this.velocityY = 0;
    }
  }

  draw() {
    this.sprite.draw();
  }

  shift(x, y) {
    this.sprite.move({
      dx: x,
      dy: y,
      ms: null,
    });
  }

  isOutOfBounds(bounds) {
    return (
      this.x + this.width < bounds[0] ||
      this.y + this.height < bounds[1] ||
      this.x > bounds[2] ||
      this.y > bounds[3]
    );
  }

  checkCollision(box) {
    const x = box[0];
    const y = box[1];
    const width = box[2];
    const height = box[3];

    return (
      this.x + this.width >= x &&
      this.x <= x + width &&
      this.y + this.height >= y &&
      this.y <= y + height
    );
  }

  get bounds() {
    return this.sprite.getBounds();
  }

  get x() {
    return this.bounds.x;
  }

  get y() {
    return this.bounds.y;
  }

  get width() {
    return this.bounds.width;
  }

  get height() {
    return this.bounds.height;
  }
}
