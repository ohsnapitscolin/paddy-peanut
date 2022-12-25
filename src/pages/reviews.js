import React from "react";
import { graphql } from "gatsby";
import { Container, Row, Column } from "../layout/bootstrap";
import Review from "../components/Review";
import Seo from "../components/global/Seo";

export default function Reivews({ data }) {
  return (
    <>
      <Seo title="Reviews" />
      <Container>
        {data.allContentfulReviewsPage.nodes[0].reviews.map(review => (
          <Row>
            <Column className="col-6 offset-3 mb-5">
              <Review {...review} />
            </Column>
          </Row>
        ))}
      </Container>
    </>
  );
}

export const query = graphql`
  query {
    allContentfulReviewsPage {
      nodes {
        reviews {
          name
          about
          description {
            childMarkdownRemark {
              html
            }
          }
          stars
        }
      }
    }
  }
`;
