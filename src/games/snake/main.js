import { Graphics } from "pixi.js";

import Game from "../game";

// Constants
import { Direction, GameState } from "../contants";

const SnakeFill = 0x228b22;

export default class Snake extends Game {
  initialize(app, loader) {
    this.graphics = new Graphics();

    this.app = app;
    this.loader = loader;

    this.setup();
  }

  setup() {
    this.reset();
    this.app.stage.addChild(this.graphics);
    this.app.ticker.add(this.tick.bind(this));
  }

  reset() {
    this.score = 0;
    this.ticks = 0;
    this.direction = Direction.None;
    this.gameState = GameState.Active;

    this.snake = [];
    this.food = [];

    let [x, y] = this.randomSpace();
    this.snake.push([x, y]);

    [x, y] = this.randomSpace();
    this.food.push([x, y]);

    this.updateState({
      score: this.score,
      gameState: this.gameState,
    });

    this.draw();
  }

  setDirection(dir) {
    if (this.direction === Direction.Up && dir === Direction.Down) return;
    if (this.direction === Direction.Down && dir === Direction.Up) return;
    if (this.direction === Direction.Left && dir === Direction.Right) return;
    if (this.direction === Direction.Right && dir === Direction.Left) return;

    this.direction = dir;
  }

  tick() {
    if (this.direction === Direction.None || this.gameState === GameState.Over)
      return;

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
      this.gameState = GameState.Over;
      this.updateState({
        gameState: this.gameState,
      });
      return;
    }

    this.snake.unshift(newHead);

    const grow = this.food.find(([x, y]) => newX === x && newY === y);

    if (!grow) {
      this.snake.pop();
    } else {
      this.score++;
      this.updateState({
        score: this.score,
      });
      this.food[0] = this.randomSpace();
    }

    this.draw();
  }

  draw() {
    this.graphics.clear();

    this.snake.forEach(([x, y]) => {
      this.graphics.beginFill(SnakeFill);
      this.graphics.drawRect(x * 10, y * 10, 10, 10);
    });

    this.food.forEach(([x, y]) => {
      this.graphics.beginFill("red");
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
}
