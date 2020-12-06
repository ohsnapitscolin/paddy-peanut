import React from "react";
import styled from "styled-components";

import "../styles/index.scss";

// Components
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Main = styled.div`
  min-height: calc(100vh - (64px + 128px));
  padding-top: 16px;
  padding-bottom: 64px;
`;

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Main>{this.props.children}</Main>
        <Footer />
      </>
    );
  }
}
