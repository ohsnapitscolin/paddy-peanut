import React, { useState } from "react";

// Components
import { Container, Row, Column } from "../../layout/bootstrap";
import Game from "./game";
import Button from "../../components/global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Jump from "../../games/jump/main";
import { GameState } from "../../games/contants";

export default function JumpGame() {
  const [game] = useState(new Jump());

  const { pixiRef, state } = usePixi(game, {
    score: 0,
    gameState: GameState.Inactive,
  });

  function start() {
    game.reset();
    game.start();
  }

  function jump() {
    game.jump();
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
              title="Jumping With Freddie"
              message={`Score: ${score} ${gameText && ` - ${gameText}`}`}
              pixiRef={pixiRef}
            />

            {gameState !== GameState.Active ? (
              <Button onClick={start}>Play</Button>
            ) : (
              <Button onClick={jump}>Jump</Button>
            )}
          </Column>
        </Row>
      </Container>
    </>
  );
}
