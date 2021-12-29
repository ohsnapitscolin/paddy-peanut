import Sprite from "../sprite";

export default class Obstacle {
  constructor(texture, [x, y, width]) {
    this.sprite = new Sprite(texture, { x, y, width });
  }

  getSprite() {
    return this.sprite.getSprite();
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
    const { x, y, width, height } = this.sprite.getBounds();
    return (
      x + width < bounds[0] ||
      y + height < bounds[1] ||
      x > bounds[2] ||
      y > bounds[3]
    );
  }

  getBox() {
    const { x, y, width, height } = this.sprite.getBounds();
    return [x, y, width, height];
  }
}
