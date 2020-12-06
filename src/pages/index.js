import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

import { Container, Row, Column } from "../layout/bootstrap";

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
            <Title>Paddy Peanut</Title>
            <ImageWrapper>
              <Img fluid={heroImage.fluid} />
            </ImageWrapper>
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
