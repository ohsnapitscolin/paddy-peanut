import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Button from "../components/global/Button";

import { Container, Row, Column } from "../layout/bootstrap";

const Intro = styled.span`
  font-family: cursive;
  font-size: 24px;
`;

const Title = styled.h1`
  z-index: 2;
  width: 100%;
  text-align: center;

  font-family: cursive;
  font-size: 100px;
`;

const ImageWrapper = styled.div`
  z-index: 1;
  margin-top: -100px;
  width: 500px;
`;

export default class IndexPage extends React.Component {
  render() {
    const data = this.props.data.allContentfulHomePage.nodes[0];
    const { heroImage } = data;
    return (
      <Container>
        <Row>
          <Column className="col-12" center={true}>
            <Intro>Introducing...</Intro>
            <Title>Paddy Peanut</Title>
            <ImageWrapper>
              <Img fluid={heroImage.fluid} />
            </ImageWrapper>
            <Button>Get The Book</Button>
          </Column>
        </Row>
      </Container>
    );
  }
}

export const query = graphql`
  query {
    allContentfulHomePage {
      nodes {
        heroImage {
          description
          fluid(maxWidth: 1200, quality: 100) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
