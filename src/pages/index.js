import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ComingSoonIcon from "../images/svgs/coming-soon.svg";

import { Column, Container, Row } from "../layout/bootstrap";

import Seo from "../components/global/Seo";
import ContentBlock from "../components/content/Block";
import { LayoutContext } from "../context/layout";

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ComingSoonRow = styled(Row)`
  margin-top: -40px;
`;

export default function IndexPage(props) {
  const data = props.data.allContentfulHomePage.nodes[0];
  const { mainImage, shortDescription, longDescription } = data;

  const { setFixed, hideFooter } = useContext(LayoutContext);

  useEffect(() => {
    setFixed(true);
    hideFooter(true);

    return () => {
      setFixed(false);
      hideFooter(false);
    };
  }, [setFixed, hideFooter]);

  return (
    <>
      <Seo title="Home" />
      <ImageWrapper>
        <GatsbyImage
          image={getImage(mainImage)}
          alt=""
          style={{
            width: "90%",
            height: "90%",
          }}
          objectFit="contain"
          objectPosition="center center"
        />
      </ImageWrapper>

      <Container>
        <ComingSoonRow>
          <Column>
            <img src={ComingSoonIcon} alt="Coming Soon" />
          </Column>
        </ComingSoonRow>
      </Container>

      <Container className="fixed-bottom">
        <Row>
          <ContentBlock className="col-5 mb-4" content={shortDescription} />
          <ContentBlock className="col-7 mb-4" content={longDescription} />
        </Row>
      </Container>
    </>
  );
}

export const query = graphql`
  query {
    allContentfulHomePage {
      nodes {
        mainImage {
          description
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
        shortDescription {
          body {
            childMarkdownRemark {
              html
            }
          }
        }
        longDescription {
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
