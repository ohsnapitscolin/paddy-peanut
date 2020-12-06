import React from "react";
import styled from "styled-components";

import { Color } from "../../utils/style";
import { Container, Row, Column } from "../../layout/bootstrap";

const FooterElement = styled.footer`
  width: 100%;
  height: 128px;

  background-color: ${Color.paddyDeepYellow};
  border-top: solid 1px black;

  display: flex;
  align-items: center;
`;

export default class Footer extends React.Component {
  render() {
    return (
      <FooterElement>
        <Container>
          <Row>
            <Column className="col-12">
              <p>Copyright 2020, Patricia Fumerton</p>
              <p>All rights reserved</p>
            </Column>
          </Row>
        </Container>
      </FooterElement>
    );
  }
}
