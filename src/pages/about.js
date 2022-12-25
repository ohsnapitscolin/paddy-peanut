import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Column, Container, Row } from "../layout/bootstrap";

import Seo from "../components/global/Seo";
import ContentBlock from "../components/content/Block";

const AboutImage = styled(GatsbyImage)`
  border-radius: 16px;
  width: unset;
  height: 280px;
  margin-right: 40px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default class AboutPage extends React.Component {
  render() {
    const data = this.props.data.allContentfulAboutPage.nodes[0];
    const { content, images } = data;

    return (
      <>
        <Seo title="About" />
        <Container>
          <Row className="mb-5">
            <Column className="col-12" direction="row">
              {images.map((image, i) => (
                <AboutImage
                  key={i}
                  image={getImage(image)}
                  alt=""
                  objectFit="cover"
                  objectPosition="center center"
                />
              ))}
            </Column>
          </Row>
          {content.map((c, i) => (
            <Row key={i}>
              <ContentBlock className="col-12 col-sm-8 mb-4" content={c} />
            </Row>
          ))}
        </Container>
      </>
    );
  }
}

export const query = graphql`
  query {
    allContentfulAboutPage {
      nodes {
        images {
          description
          gatsbyImageData(layout: CONSTRAINED, placeholder: NONE)
        }
        content {
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
