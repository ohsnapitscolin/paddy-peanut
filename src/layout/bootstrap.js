import React from "react";
import styled from "styled-components";

export const Container = styled.div.attrs({
  className: "container",
})`
  box-sizing: border-box;
`;

export const Row = styled.div.attrs({
  className: "row",
})``;

const ColumnElement = styled.div`
  display: flex;
  flex-direction: ${p => p.direction};
  align-items: ${p => (p.center ? "center" : "flex-start")};
`;

export class Column extends React.Component {
  render() {
    const { className = "col-12", direction = "column", center } = this.props;
    return (
      <ColumnElement
        className={className}
        direction={direction}
        center={center}
      >
        {this.props.children}
      </ColumnElement>
    );
  }
}
