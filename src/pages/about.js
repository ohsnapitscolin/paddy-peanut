import React from "react";

import { Container, Row, Column } from "../layout/bootstrap";

export default class AboutPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Column className="col-12">About</Column>
        </Row>
      </Container>
    );
  }
}
