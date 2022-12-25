import React from "react";
import styled, { css } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Column } from "../../layout/bootstrap";
import { Color, responsive } from "../../utils/style";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${responsive.sm`
    flex-direction: row;
  `}
`;

const Body = styled.div`
  blockquote {
    font-style: italic;
    padding: 0 32px;
    border-left: 1px solid ${Color.paddyBrown};
  }

  p {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 16px;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 24px;

  ${responsive.sm`
    margin: 0 24px 0 0;
    width: 150px;
  `}

  ${responsive.md`
    width: 250px;
  `}

  ${p =>
    p.align === "Right" &&
    css`
      ${responsive.sm`
        order: 1;
        margin: 0 0 0 16px;
      `}
    `}
`;

const ImageDescription = styled.p`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
`;

export default function Block({ className, content }) {
  const { body, image, align } = content;
  return (
    <Column className={className}>
      <ContentWrapper>
        {image && (
          <ImageWrapper align={align}>
            <GatsbyImage
              image={getImage(image)}
              alt=""
              style={{ width: "100%" }}
              imgStyle={{ objectFit: "contain" }}
            />
            {!!image.description && (
              <ImageDescription>{image.description}</ImageDescription>
            )}
          </ImageWrapper>
        )}
        <Body
          dangerouslySetInnerHTML={{
            __html: body.childMarkdownRemark.html,
          }}
        ></Body>
      </ContentWrapper>
    </Column>
  );
}
