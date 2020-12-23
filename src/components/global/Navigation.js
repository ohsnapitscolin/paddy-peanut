import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";
import Link from "gatsby-link";

import { Color, responsive } from "../../utils/style";
import { Container, Row, Column } from "../../layout/bootstrap";

import branch from "../../images/branch.png";

const NavigationPadding = styled.div`
  height: 64px;
  position: relative;
  width: 100%;
`;

const NavigationElement = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 9999;

  width: 100%;
  height: 64px;

  background-color: ${Color.paddyDeepYellow};
  border-bottom: solid 1px black;

  display: flex;
  align-items: center;
`;

const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: flex;
`;

const PimaryLink = styled.li`
  margin-right: 16px;
  font-weight: 500;
`;

const NavLink = styled.li`
  margin-right: 16px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Branches = styled.div`
  height: 0;
  display: none;

  ${responsive.sm`
    display: block;
  `}
`;

const LeftBranch = styled.img`
  position: absolute;
  top: -15px;
  left: 75px;

  top: -10px;
  left: -48px;

  ${responsive.md`
    left: 32px;
  `}

  ${responsive.lg`
    left: 80px;
  `}
`;

const RightBranch = styled.img`
  position: absolute;
  height: 420px;
  transform: scaleX(-1);

  top: -10px;
  right: -12px;

  ${responsive.md`
    right: 48px;
  `}

  ${responsive.lg`
    right: 120px;
  `}
`;

export class Navigation extends React.Component {
  render() {
    const navigation = this.props.data.allContentfulNavigation.nodes[0];
    const { title, links } = navigation;

    return (
      <>
        <NavigationPadding />
        <NavigationElement>
          <Container>
            <Row>
              <Column className="col-12" direction="row">
                <LinkList>
                  <PimaryLink>
                    <Link to="/">{title}</Link>
                  </PimaryLink>
                  {links.map((link, i) => {
                    return (
                      <NavLink key={i}>
                        <Link to={link.url}>{link.title}</Link>
                      </NavLink>
                    );
                  })}
                </LinkList>
              </Column>
            </Row>
          </Container>
        </NavigationElement>
        <Branches>
          <LeftBranch src={branch} />
          <RightBranch src={branch} />
        </Branches>
      </>
    );
  }
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <Navigation {...props} data={data} />}
  />
);

const query = graphql`
  query {
    allContentfulNavigation {
      nodes {
        title
        links {
          title
          url
        }
      }
    }
  }
`;
