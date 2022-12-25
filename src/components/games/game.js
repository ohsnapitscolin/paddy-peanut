import React from "react";
import styled from "styled-components";
import { GameState } from "../../games/contants";
import Button from "../../components/global/Button";

import { Color } from "../../utils/style";

const GameContainer = styled.div`
  position: relative;

  border: 2px solid ${Color.paddyRed};
  border-radius: 25px;

  cursor: pointer;
  overflow: hidden;

  &.inactive {
    canvas {
      filter: blur(0.5px);
      opacity: 0.5;
    }
  }
`;

const PixContainer = styled.div`
  display: flex;
  canvas {
    touch-action: auto !important;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 0;
`;

const Messaging = styled.span`
  font-size: 18px;
  margin-bottom: 8px;
`;

const PlayButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Game({
  title,
  message,
  pixiRef,
  start,
  gameState,
  onClick,
}) {
  const inactive = gameState !== GameState.Active;

  function handleStart(e) {
    e.preventDefault();
    start();
  }

  return (
    <>
      <Title>{title}</Title>
      <Messaging>{message}</Messaging>
      <GameContainer className={`mb-4 ${inactive && "inactive"}`}>
        <PixContainer onClick={onClick} ref={pixiRef} />
        {inactive && <PlayButton onClick={handleStart}>Play</PlayButton>}
      </GameContainer>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        molestie velit eget purus lacinia iaculis. Proin molestie nisl in ligula
        fringilla dapibus.
      </p>
    </>
  );
}
