import React from "react";
import styled from "styled-components";

export class Container extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export class Row extends React.Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

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
