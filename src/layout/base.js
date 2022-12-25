import React from "react";
import styled from "styled-components";
import { LayoutContext } from "../context/layout";

import "../styles/index.scss";

// Components
import Navigation from "../components/global/Navigation";
import Footer from "../components/global/Footer";

const Main = styled.div`
  position: relative;

  height: auto;
  min-height: 100vh;
  padding-bottom: 128px;

  &.fixed {
    height: 100vh;
    overflow: hidden;
    padding-bottom: 0;
  }
`;

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.hideFooter = hide => {
      this.setState({
        footer: !hide,
      });
    };

    this.setFixed = fixed => {
      this.setState({
        fixed,
      });
    };

    this.state = {
      fixed: false,
      footer: true,
      setFixed: this.setFixed,
      hideFooter: this.hideFooter,
    };
  }

  render() {
    return (
      <>
        <Main className={this.state.fixed && "fixed"}>
          <Navigation />
          <LayoutContext.Provider value={this.state}>
            {this.props.children}
          </LayoutContext.Provider>
          {this.state.footer && <Footer />}
        </Main>
      </>
    );
  }
}
