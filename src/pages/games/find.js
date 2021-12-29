import React, { useState } from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../../layout/bootstrap";

import Seo from "../../components/global/Seo";
import Button from "../../components/global/Button";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Find from "../../games/find/main";
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
      <Seo title="Find Freddie Frog" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Find Freddie Frog</Title>
            <Messaging>
              Streak: {streak} {gameText && ` - ${gameText}`}
            </Messaging>
            <GameContainer ref={pixiRef} />
            <Button disabled={gameState === GameState.Active} onClick={start}>
              Play
            </Button>
          </Column>
        </Row>
      </Container>
    </>
  );
}
