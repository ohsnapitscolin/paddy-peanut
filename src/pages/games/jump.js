import React, { useState } from "react";
import styled from "styled-components";

// Components
import { Container, Row, Column } from "../../layout/bootstrap";
import Seo from "../../components/global/Seo";
import Button from "../../components/global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Jump from "../../games/jump/main";
import { GameState } from "../../games/contants";

const GameContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 54px;
  margin-bottom: 8px;
`;

const Messaging = styled.span`
  font-size: 24px;
`;

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
      <Seo title="Jumping With Freddie" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Jumping With Freddie</Title>
            <Messaging>
              Score: {score} {gameText && ` - ${gameText}`}
            </Messaging>
            <GameContainer ref={pixiRef} />
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
