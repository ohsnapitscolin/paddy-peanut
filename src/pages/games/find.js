import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../../layout/bootstrap";

import SEO from "../../components/global/Seo";
import Button from "../../components/global/Button";

import usePixi from "../../hooks/pixi";
import Find from "../../games/find/main";

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
  const [find] = useState(new Find());

  const [streak, setStreak] = useState(0);
  const [gameText, setGameText] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const { pixiRef, app, loader } = usePixi();

  useEffect(() => {
    if (!app || !loader) return;
    find.initialize(app, loader, update);
  }, [app, loader, find]);

  function start() {
    find.start();
  }

  function update({ streak, gameText, inProgress }) {
    setStreak(streak);
    setGameText(gameText);
    setInProgress(inProgress);
  }

  return (
    <>
      <SEO title="Find Freddie Frog" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Find Freddie Frog</Title>
            <Messaging>
              Streak: {streak} {gameText && ` - ${gameText}`}
            </Messaging>
            <GameContainer ref={pixiRef} />
            <Button disabled={inProgress} onClick={start}>
              Play
            </Button>
          </Column>
        </Row>
      </Container>
    </>
  );
}
