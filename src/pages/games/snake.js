import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../../layout/bootstrap";

import SEO from "../../components/global/Seo";
import Button from "../../components/global/Button";

import usePixi from "../../hooks/pixi";
import Snake from "../../games/snake/main";

const GameContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 54px;
  margin-bottom: 8px;
`;

const Messaging = styled.span`
  font-size: 24px;
`;

const ArrowButton = styled.button`
  padding: 0;
  width: 40px;
  height: 40px;
  flex-grow: 0;

  align-items: center;

  font-size: 32px;

  &:hover {
    opacity: 0.56;
  }
`;

export default function FrogGame() {
  const [snake] = useState(new Snake());

  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [state, setState] = useState(null);

  const { pixiRef, app, loader } = usePixi();

  useEffect(() => {
    if (!app || !loader) return;
    snake.initialize(app, loader, update);
  }, [app, loader, snake]);

  useEffect(() => {
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  function update({ score, direction, state }) {
    setScore(score);
    setDirection(direction);
    setState(state);
  }

  function keydown({ key }) {
    switch (key) {
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      default:
        break;
    }
  }

  function up() {
    snake.setDirection(0);
  }

  function down() {
    snake.setDirection(1);
  }

  function left() {
    snake.setDirection(2);
  }

  function right() {
    snake.setDirection(3);
  }

  function reset() {
    snake.reset();
  }

  return (
    <>
      <SEO title="Feed Sneaky Snake" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Feed Sneaky Snake</Title>
            <Messaging>Score: {score}</Messaging>
            <GameContainer ref={pixiRef} />
            <div className="d-flex flex-column align-items-center mb-3">
              <ArrowButton disabled={direction === 0} onClick={up}>
                ⬆️
              </ArrowButton>
              <div className="d-flex flex-row justify-content-center">
                <ArrowButton disabled={direction === 2} onClick={left}>
                  ⬅️
                </ArrowButton>
                <ArrowButton disabled={direction === 3} onClick={right}>
                  ➡️
                </ArrowButton>
              </div>
              <ArrowButton disabled={direction === 1} onClick={down}>
                ⬇️
              </ArrowButton>
            </div>
            <Button disabled={state !== 1} onClick={reset}>
              Reset
            </Button>
          </Column>
        </Row>
      </Container>
    </>
  );
}
