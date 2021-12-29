import { Graphics } from "pixi.js";

import RockImage from "../../images/games/rock.png";
import FrogImage from "../../images/games/frog.png";

import Jumper from "./jumper";
import Obstacle from "./obstacle";
import Line from "../line";

const State = {
  Active: 0,
  Over: 1,
};

export default class Jump {
  initialize(app, loader, updateFn) {
    this.graphics = new Graphics();
    this.obstacles = [];

    this.app = app;
    this.loader = loader;
    this.updateFn = updateFn;

    this.state = State.Over;

    this.loader.add("rock", RockImage);
    this.loader.add("frog", FrogImage);

    this.loader.onProgress.add(() => {});
    this.loader.onError.add(() => {});
    this.loader.onLoad.add(() => {});
    this.loader.onComplete.add(() => {});

    this.loader.load(this.setup.bind(this));
  }

  setup() {
    this.app.stage.addChild(this.graphics);

    const { frog } = this.loader.resources;
    this.jumper = new Jumper(frog.texture, [50, 230, 31]);
    this.app.stage.addChild(this.jumper.getSprite());

    this.line = new Line([0, 250, 300, 250], 1);

    this.reset();

    this.app.ticker.add(this.tick.bind(this));
  }

  start() {
    this.state = State.Active;
    this.maybeAddObstacle();
  }

  reset() {
    this.obstacles.forEach(o => this.app.stage.removeChild(o.getSprite()));
    this.obstacles = [];

    this.jumper.reset();

    this.ticks = 0;
    this.speed = 2;

    this.draw();
  }

  jump() {
    this.jumper.jump();
  }

  tick() {
    if (this.state === State.Over) return;

    this.ticks++;

    this.obstacles.forEach(o => o.shift(this.speed * -1, 0));
    this.jumper.move();

    this.draw();

    this.updateSpeed();
    this.maybeAddObstacle();
    this.checkCollisions();
    this.checkBounds();

    this.updateFn({ score: Math.floor(this.ticks / 10) });
  }

  draw() {
    this.graphics.clear();

    this.line.draw(this.graphics);
    this.obstacles.forEach(o => {
      o.draw(this.graphics);
    });
    this.jumper.draw(this.graphics);
  }

  checkBounds() {
    const filtered = this.obstacles.map(o => {
      if (o.isOutOfBounds([0, 0, 1000, 1000])) {
        this.app.stage.removeChild(o);
        return false;
      }

      return o;
    });

    this.obstacles = filtered.filter(Boolean);
  }

  maybeAddObstacle() {
    if (this.obstacles.length > 2) return;

    const count = this.obstacles.length;
    const min = count ? this.obstacles[count - 1].getBox()[0] : 300;
    const gap = 200;
    const offset = count ? Math.random() * 200 + gap + min : min;

    const big = Math.random() > 0.8;
    const y = big ? 205 : 220;
    const width = big ? 45 : 30;

    const { rock } = this.loader.resources;

    const obstacle = new Obstacle(rock.texture, [offset, y, width]);
    this.app.stage.addChild(obstacle.getSprite());
    this.obstacles.push(obstacle);
  }

  checkCollisions() {
    const collision = this.obstacles.find(o => {
      return this.jumper.checkCollision(o.getBox());
    });

    if (collision) {
      this.state = State.Over;
      this.updateFn({
        state: State.Over,
      });
    }
  }

  updateSpeed() {
    this.speed = 2 + this.ticks / 1000;
  }
}
