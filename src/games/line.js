export default class Line {
  constructor(points, width, color) {
    this.points = points;
    this.width = width || 1;
    this.color = color || 0x000000;
  }

  draw(graphics) {
    graphics.lineStyle(this.width, this.color);
    graphics.moveTo(this.points[0], this.points[1]);
    graphics.lineTo(this.points[2], this.points[3]);
  }

  shift(x, y) {
    this.points[0] += x;
    this.points[1] += y;
    this.points[2] += x;
    this.points[3] += y;
  }
}
