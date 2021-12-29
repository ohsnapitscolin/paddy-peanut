import React from "react";
import styled from "styled-components";

import Hide from "../components/games/hide";
import Jump from "../components/games/jump";
import Snake from "../components/games/snake";

const GameContainer = styled.div`
  margin-bottom: 124px;
`;

export default function GamesPage() {
  const Games = [Hide, Jump, Snake];

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {Games.map((Game, i) => {
        return (
          <>
            <GameContainer key={i}>
              <Game />
            </GameContainer>
          </>
        );
      })}
    </div>
  );
}
