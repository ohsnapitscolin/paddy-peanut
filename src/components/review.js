import React from "react";
import styled from "styled-components";
import StarIcon from "../images/svgs/star.svg";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Stars = styled.div`
  display: flex;

  img {
    height: 23px;
  }

  margin-bottom: 20px;
`;

export default function Review({ name, about, description, stars }) {
  const rating = new Array(stars).fill(0);
  return (
    <Content>
      <Stars>
        {rating.map(() => (
          <img src={StarIcon} alt="star" />
        ))}
      </Stars>
      <Description
        dangerouslySetInnerHTML={{
          __html: description.childMarkdownRemark.html,
        }}
      />
      <span>
        — {name}, {about}
      </span>
    </Content>
  );
}
