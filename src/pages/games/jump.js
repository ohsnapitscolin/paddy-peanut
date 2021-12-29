import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
import { Container, Row, Column } from "../../layout/bootstrap";
import SEO from "../../components/global/Seo";
import Button from "../../components/global/Button";

import usePixi from "../../hooks/pixi";
import Jump from "../../games/jump/main";

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
  const [jump] = useState(new Jump());

  const [newGame, setNewGame] = useState(true);
  const [score, setScore] = useState(0);

  const { pixiRef, app, loader } = usePixi();

  useEffect(() => {
    if (!app || !loader) return;
    jump.initialize(app, loader, update);
  }, [app, loader, jump]);

  function action() {
    jump.jump();
  }

  function start() {
    setNewGame(false);
    jump.reset();
    jump.start();
  }

  function update({ score, state }) {
    if (score) {
      setScore(score);
    }

    if (state === 1) {
      setNewGame(true);
    }
  }

  return (
    <>
      <SEO title="Jumping With Freddie" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Watch Freddie Jump</Title>
            <Messaging>Score: {score}</Messaging>
            <GameContainer ref={pixiRef} />
            {newGame ? (
              <Button onClick={start}>Play</Button>
            ) : (
              <Button onClick={action}>Jump</Button>
            )}
          </Column>
        </Row>
      </Container>
    </>
  );
}
