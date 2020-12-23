import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import { Container, Row, Column } from "../layout/bootstrap";
import ContentBlock from "../components/content/Block";

const Title = styled.h1`
  text-align: center;
  font-family: cursive;
  font-size: 54px;
`;

export default class AboutPage extends React.Component {
  render() {
    const data = this.props.data.allContentfulAboutPage.nodes[0];
    const { content } = data;
    return (
      <Container>
        <Row>
          <Column className="col-12 mb-4" center={true}>
            <Title>About the Author</Title>
          </Column>
        </Row>
        {content.map((c, i) => (
          <ContentBlock
            key={i}
            className="col-12 col-sm-8 offset-sm-2 mb-4"
            content={c}
          />
        ))}
      </Container>
    );
  }
}

export const query = graphql`
  query {
    allContentfulAboutPage {
      nodes {
        content {
          title
          image {
            description
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
            }
          }
          align
        }
      }
    }
  }
`;
