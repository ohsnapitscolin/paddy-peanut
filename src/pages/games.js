import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Seo from "../components/global/Seo";
import { Container, Row, Column } from "../layout/bootstrap";

const GameContainer = styled.div`
  width: 100%;
  margin-bottom: 124px;
  display: flex;
  flex-direction: column;
  align-items: start;

  &:last-of-type {
    margin-bottom: 56px;
  }
`;

const GamesGird = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
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
      <Container>
        <Row>
          <Column className="col-12">
            <GamesGird>
              {games.map((Game, i) => {
                return (
                  <React.Fragment key={i}>
                    <GameContainer>
                      <Game />
                    </GameContainer>
                  </React.Fragment>
                );
              })}
            </GamesGird>
          </Column>
        </Row>
      </Container>
    </>
  );
}
