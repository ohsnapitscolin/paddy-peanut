import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Components
import { Container, Row, Column } from "../../layout/bootstrap";
import Game from "./game";
import Button from "../../components/global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Snake from "../../games/snake/main";
import { GameState } from "../../games/contants";

const ArrowButton = styled(Button)`
  padding: 5px;
  width: 48px;
  height: 48px;
  flex-grow: 0;

  margin: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  line-height: 32px;

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

  function keydown(e) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        up();
        break;
      case "ArrowDown":
        e.preventDefault();
        down();
        break;
      case "ArrowLeft":
        e.preventDefault();
        left();
        break;
      case "ArrowRight":
        e.preventDefault();
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
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Game
              title="Eating with Gertie"
              message={`Score: ${score} ${gameText && ` - ${gameText}`}`}
              pixiRef={pixiRef}
            />

            <div className="d-flex flex-column align-items-center mb-4">
              <ArrowButton onClick={up}>⇧</ArrowButton>
              <div className="d-flex flex-row justify-content-center">
                <ArrowButton onClick={left}>⇦</ArrowButton>
                <Center />
                <ArrowButton onClick={right}>⇨</ArrowButton>
              </div>
              <ArrowButton onClick={down}>⇩</ArrowButton>
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
