import React, { useState } from "react";

// Components
import { Container, Row, Column } from "../../layout/bootstrap";
import Game from "./game";
import Button from "../global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Find from "../../games/hide/main";
import { GameState } from "../../games/contants";

export default function FrogGame() {
  const [game] = useState(new Find());

  const { pixiRef, state } = usePixi(game, {
    streak: 0,
    gameState: GameState.Inactive,
  });

  function start() {
    game.start();
  }

  function getGameText() {
    switch (state.gameState) {
      case GameState.Win:
        return "Winner!";
      case GameState.Over:
        return "Try Again";
      default:
        return "";
    }
  }

  const { streak, gameState } = state;
  const gameText = getGameText();

  return (
    <>
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Game
              title="Hide & Seek With Tommy"
              message={`Streak: ${streak} ${gameText && ` - ${gameText}`}`}
              pixiRef={pixiRef}
            />

            <Button disabled={gameState === GameState.Active} onClick={start}>
              Play
            </Button>
          </Column>
        </Row>
      </Container>
    </>
  );
}
