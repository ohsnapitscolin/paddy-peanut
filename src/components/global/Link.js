import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { Color } from "../../utils/style";

const LinkElement = styled(Link)`
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

export default function (props) {
  const { to } = props;
  return <LinkElement to={to}>{props.children}</LinkElement>;
}
