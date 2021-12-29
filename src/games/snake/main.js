import { Graphics } from "pixi.js";

const Type = {
  None: 0,
  Snake: 1,
  Food: 2,
};

const Direction = {
  None: -1,
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
};

const State = {
  Active: 0,
  Over: 1,
};

export default class Snake {
  initialize(app, loader, updateFn) {
    this.graphics = new Graphics();

    this.app = app;
    this.loader = loader;
    this.updateFn = updateFn;

    this.setup();
  }

  setup() {
    this.app.stage.addChild(this.graphics);

    this.reset();

    this.app.ticker.add(this.tick.bind(this));
  }

  reset() {
    this.score = 0;
    this.ticks = 0;
    this.direction = Direction.None;
    this.state = State.Active;

    this.snake = [];
    this.food = [];

    let [x, y] = this.randomSpace();
    this.snake.push([x, y]);

    [x, y] = this.randomSpace();
    this.food.push([x, y]);

    this.update();

    this.draw();
  }

  setDirection(dir) {
    if (this.direction === Direction.Up && dir === Direction.Down) return;
    if (this.direction === Direction.Down && dir === Direction.Up) return;
    if (this.direction === Direction.Left && dir === Direction.Right) return;
    if (this.direction === Direction.Right && dir === Direction.Left) return;

    this.direction = dir;
    this.update();
  }

  tick() {
    if (this.direction === Direction.None || this.state === State.Over) return;

    this.ticks++;

    if (this.ticks % 5 !== 0) return;

    const [headX, headY] = this.snake[0];

    let newX = headX;
    if (this.direction === Direction.Right) {
      newX += 1;
    } else if (this.direction === Direction.Left) {
      newX -= 1;
    }

    let newY = headY;
    if (this.direction === Direction.Up) {
      newY -= 1;
    } else if (this.direction === Direction.Down) {
      newY += 1;
    }

    const newHead = [newX, newY];

    // Collisions
    let collision = false;
    if (newX < 0 || newX >= 30 || newY < 0 || newY >= 30) {
      collision = true;
    } else {
      collision = !!this.snake.find(([x, y]) => x === newX && y === newY);
    }

    if (collision) {
      this.state = State.Over;
      this.update();
      return;
    }

    this.snake.unshift(newHead);

    const grow = this.food.find(([x, y]) => newX === x && newY === y);

    if (!grow) {
      this.snake.pop();
    } else {
      this.score++;
      this.update();
      this.food[0] = this.randomSpace();
    }

    this.draw();
  }

  draw() {
    this.graphics.clear();

    this.snake.forEach(([x, y]) => {
      this.graphics.beginFill(0x000000);
      this.graphics.drawRect(x * 10, y * 10, 10, 10);
    });

    this.food.forEach(([x, y]) => {
      this.graphics.beginFill(0xff0000);
      this.graphics.drawRect(x * 10, y * 10, 10, 10);
    });
  }

  randomSpace() {
    const x = Math.floor(Math.random() * 30);
    const y = Math.floor(Math.random() * 30);

    if (this.snake[x] && this.snake[x][y]) {
      return this.randomSpace();
    }

    return [x, y];
  }

  update() {
    this.updateFn({
      score: this.score,
      direction: this.direction,
      state: this.state,
    });
  }
}
