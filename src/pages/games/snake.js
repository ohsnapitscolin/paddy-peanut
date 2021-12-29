import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../../layout/bootstrap";

import Seo from "../../components/global/Seo";
import Button from "../../components/global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Snake from "../../games/snake/main";
import { GameState } from "../../games/contants";

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

const ArrowButton = styled(Button)`
  padding: 5px;
  width: 40px;
  height: 40px;
  flex-grow: 0;

  margin: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;

  &:hover {
    opacity: 0.56;
  }
`;

const Center = styled.div`
  width: 40px;
`;

export default function FrogGame() {
  const [game] = useState(new Snake());

  const { pixiRef, state } = usePixi(game, {
    score: 0,
    gameState: GameState.Inactive,
  });

  useEffect(() => {
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

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
    game.setDirection(0);
  }

  function down() {
    game.setDirection(1);
  }

  function left() {
    game.setDirection(2);
  }

  function right() {
    game.setDirection(3);
  }

  function reset() {
    game.reset();
  }

  function getGameText() {
    switch (state.gameState) {
      case GameState.Over:
        return "Try Again";
      default:
        return "";
    }
  }

  const { score, gameState } = state;
  const gameText = getGameText();

  return (
    <>
      <Seo title="Feed Gertie the Garter" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Feed Gertie the Garter</Title>
            <Messaging>
              Score: {score} {gameText && ` - ${gameText}`}
            </Messaging>
            <GameContainer className="mb-4" ref={pixiRef} />

            <div className="d-flex flex-column align-items-center mb-3">
              <ArrowButton onClick={up}>⬆</ArrowButton>
              <div className="d-flex flex-row justify-content-center">
                <ArrowButton onClick={left}>⬅</ArrowButton>
                <Center />
                <ArrowButton className="mr-4" onClick={right}>
                  ⮕
                </ArrowButton>
              </div>
              <ArrowButton onClick={down}>⬇</ArrowButton>
            </div>

            <Button disabled={gameState !== GameState.Over} onClick={reset}>
              Play
            </Button>
          </Column>
        </Row>
      </Container>
    </>
  );
}
