import React from "react";
import styled from "styled-components";

import { Color } from "../../utils/style";
import { Container, Row, Column } from "../../layout/bootstrap";

const FooterElement = styled.footer`
  width: 100%;
  height: 60px;

  color: ${Color.paddyYellow};
  background-color: ${Color.paddyRed};

  display: flex;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;
`;

export default class Footer extends React.Component {
  render() {
    return (
      <FooterElement>
        <Container>
          <Row>
            <Column className="col-12" center={true}>
              <p>Copyright 2022, Patricia Fumerton</p>
            </Column>
          </Row>
        </Container>
      </FooterElement>
    );
  }
}
