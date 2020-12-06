import React from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../layout/bootstrap";

import { Application, Loader } from "pixi.js";
import Sprite from "../games/sprite";
import RockImage from "../images/games/rock.png";
import FrogImage from "../images/games/frog.png";

import Button from "../components/global/Button";

const RockPositions = [
  { x: 25, y: 125 },
  { x: 125, y: 125 },
  { x: 225, y: 125 },
];

export default class GamesPage extends React.Component {
  constructor() {
    super();

    this.pixiRef = React.createRef();

    this.app = null;
    this.loader = null;

    this.rocks = [];
    this.frog = [];

    this.state = {
      inProgress: false,
      gameText: "",
      streak: 0,
    };
  }

  componentDidMount() {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    this.app = new Application({
      width: 300,
      height: 300,
      transparent: true,
    });

    this.loader = new Loader();

    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    this.pixiRef.current.appendChild(this.app.view);

    // // load the texture we need
    this.loader.add("rock", RockImage);
    this.loader.add("frog", FrogImage);

    this.loader.onProgress.add(() => {});
    this.loader.onError.add(() => {});
    this.loader.onLoad.add(() => {});
    this.loader.onComplete.add(() => {});

    this.loader.load(this.setup.bind(this));
  }

  setup() {
    const { rock, frog } = this.loader.resources;

    this.rocks = this.rocks.concat([
      new Sprite(rock.texture, { x: 25, y: -100 }),
      new Sprite(rock.texture, { x: 125, y: -100 }),
      new Sprite(rock.texture, { x: 225, y: -100 }),
    ]);

    this.frogIndex = this._getRandomNumber(0, this.rocks.length);
    const frogPosition = RockPositions[this.frogIndex];

    this.frog = new Sprite(frog.texture, {
      x: frogPosition.x + 10,
      y: frogPosition.y + 25,
      width: 35,
    });

    this.app.stage.addChild(this.frog.getSprite());

    this.rocks.forEach((rock, i) => {
      rock.onClick(this.handleRockClick.bind(this, i));
      this.app.stage.addChild(rock.getSprite());
    });

    this.app.ticker.add(this.redraw.bind(this));
  }

  redraw() {
    this.rocks.forEach(rock => {
      rock.draw();
    });
    this.frog.draw();
  }

  handleRockClick(i) {
    Promise.all(
      this.rocks.map((rock, i) => {
        return rock
          .move({
            dy: -200,
          })
          .then(() => {
            const originalPosition = RockPositions[i];
            return rock.move({
              x: originalPosition.x,
              ms: 0,
            });
          });
      })
    ).then(() => {
      this.end(i === this.frogIndex);
    });
  }

  start() {
    this.setState({
      inProgress: true,
      gameText: "",
    });
    Promise.all(
      this.rocks.map((rock, i) => {
        const position = RockPositions[i];
        return rock.move({
          x: position.x,
          y: position.y,
        });
      })
    ).then(async () => {
      await this.delay(500);
      this.startShuffle();
    });
  }

  end(win) {
    if (win) {
      this.setState({
        inProgress: false,
        streak: this.state.streak + 1,
        gameText: "Winner!",
      });
    } else {
      this.setState({
        inProgress: false,
        streak: 0,
        gameText: "Try Again!",
      });
    }
  }

  startShuffle() {
    let loops = 0;
    let ms = 500;
    this.frog.hide();
    return this.loopShuffle(loops, ms).then(() => {
      this.endShuffle();
    });
  }

  async endShuffle() {
    const position = this.rocks[this.frogIndex].getPosition();
    await this.frog.move({
      x: position.x + 10,
      y: position.y + 25,
      ms: 0,
    });
    this.rocks.forEach(rock => {
      rock.setInteractive(true);
    });
    this.frog.show();
  }

  loopShuffle(loops, ms) {
    return this.shuffle(ms).then(async () => {
      if (loops > 30) return;
      loops++;
      ms -= 10;
      await this.delay(50);
      return this.loopShuffle(loops, ms);
    });
  }

  delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  shuffle(ms) {
    const taken = [];
    return Promise.all(
      this.rocks.map(rock => {
        const newPositionIndex = this._getRandomNumber(
          0,
          this.rocks.length,
          taken
        );
        taken.push(newPositionIndex);
        const { x, y } = RockPositions[newPositionIndex];
        return rock.move({ x, y, ms });
      })
    );
  }

  _getRandomNumber(min, max, taken = []) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = Math.floor(Math.random() * (max - min) + min);

    if (taken.includes(number)) {
      return this._getRandomNumber(min, max, taken);
    }
    return number;
  }

  render() {
    const { inProgress, gameText, streak } = this.state;
    return (
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            Games
            <h4>
              Streak: {streak} {gameText && ` - ${gameText}`}
            </h4>
            <div ref={this.pixiRef} />
            <Button disabled={inProgress} onClick={this.start.bind(this)}>
              Play
            </Button>
          </Column>
        </Row>
      </Container>
    );
  }
}
