export default class Rect {
  constructor([x, y, width, height], fill) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill || 0x000000;
  }

  draw(graphics) {
    graphics.beginFill(this.fill);
    graphics.drawRect(this.x, this.y, this.width, this.height);
  }

  shift(x, y) {
    this.x += x;
    this.y += y;
  }
}
