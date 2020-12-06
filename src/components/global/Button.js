import React from "react";
import styled from "styled-components";

import { Color } from "../../utils/style";

const ButtonElement = styled.button`
  color: ${Color.paddyTan};
  background-color: ${Color.paddyBrown};
  border: 2px solid ${Color.paddyBrown};

  font-weight: 500;
  padding: 12px 40px;
  border-radius: 5px;

  &:hover {
    color: ${Color.paddyBrown};
    background-color: ${Color.paddyTan};
    border-color: ${Color.paddyTan};
  }
`;

export default class Button extends React.Component {
  render() {
    return <ButtonElement {...this.props}>{this.props.children}</ButtonElement>;
  }
}
