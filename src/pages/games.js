import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Seo from "../components/global/Seo";

const GameContainer = styled.div`
  margin-bottom: 124px;

  &:last-of-type {
    margin-bottom: 56px;
  }
`;

export default function GamesPage() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function importGames() {
      const Hide = await import("../components/games/hide");
      const Jump = await import("../components/games/jump");
      const Snake = await import("../components/games/snake");
      setGames([Hide.default, Jump.default, Snake.default]);
    }
    importGames();
  }, []);

  return (
    <>
      <Seo title="Games" />
      <div className="d-flex flex-column align-items-center mt-5">
        {games.map((Game, i) => {
          return (
            <React.Fragment key={i}>
              <GameContainer>
                <Game />
              </GameContainer>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
