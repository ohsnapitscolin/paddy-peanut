import React from "react";
import styled from "styled-components";

import { Container, Row, Column } from "../layout/bootstrap";
import SEO from "../components/global/Seo";

import turtle from "../images/turtle.png";
import { responsive } from "../utils/style";

const Title = styled.h1`
  text-align: center;
  font-size: 54px;
  margin-bottom: 56px;
`;

const Turtle = styled.img`
  width: 250px;

  ${responsive.sm`
    width: 400px;
  `}
`;

export default function () {
  return (
    <>
      <SEO title="Shop" />
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Title>Coming Soon!</Title>
          </Column>
        </Row>
        <Row>
          <Column center={true}>
            <Turtle src={turtle} />
          </Column>
        </Row>
      </Container>
    </>
  );
}
