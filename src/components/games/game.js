import React from "react";
import styled from "styled-components";

import { Color } from "../../utils/style";

const GameContainer = styled.div`
  width: 300px;
  height: 300px;

  canvas {
    touch-action: auto;
    border: 2px solid ${Color.paddyBrown};
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  max-width: 400px;
  margin-bottom: 8px;
`;

const Messaging = styled.span`
  font-size: 24px;
  margin-bottom: 16px;
`;

export default function Game({ title, message, pixiRef }) {
  return (
    <>
      <Title>{title}</Title>
      <Messaging>{message}</Messaging>
      <GameContainer className="mb-4" ref={pixiRef} />
    </>
  );
}
