import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { Container, Row, Column } from "../layout/bootstrap";
import Character from "../components/Character";
import Seo from "../components/global/Seo";

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 80px;
  grid-column-gap: 40px;
`;

export default function Reivews({ data }) {
  return (
    <>
      <Seo title="Characters" />
      <Container>
        <Row>
          <Column className="col-12 mb-5">
            <CharacterGrid>
              {data.allContentfulCharacterPage.nodes[0].characters.map(
                character => (
                  <Character {...character} />
                )
              )}
            </CharacterGrid>
          </Column>
        </Row>
      </Container>
    </>
  );
}

export const query = graphql`
  query {
    allContentfulCharacterPage {
      nodes {
        characters {
          name
          image {
            gatsbyImageData(width: 300, placeholder: NONE)
          }
        }
      }
    }
  }
`;
