import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Character({ name, image }) {
  return (
    <Content>
      <GatsbyImage className="mb-4" image={getImage(image)} alt={name} />
      <span>{name}</span>
    </Content>
  );
}
