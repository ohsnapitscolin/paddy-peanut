import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";
import Link from "gatsby-link";

import { Color } from "../utils/style";

import { Container, Row, Column } from "../layout/bootstrap";

const TopNavPadding = styled.div`
  height: 64px;
  position: relative;
  width: 100%;
`;

const TopNav = styled.nav`
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
`;

const NavLink = styled.li`
  margin-right: 16px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export class Navigation extends React.Component {
  render() {
    const navigation = this.props.data.allContentfulNavigation.nodes[0];
    const { title, links } = navigation;

    return (
      <>
        <TopNavPadding />
        <TopNav>
          <Container>
            <Row>
              <Column className="col-12" direction="row">
                <LinkList>
                  <PimaryLink>
                    <Link to="/">{title}</Link>
                  </PimaryLink>
                  {links.map(link => {
                    return (
                      <NavLink>
                        <Link to={link.url}>{link.title}</Link>
                      </NavLink>
                    );
                  })}
                </LinkList>
              </Column>
            </Row>
          </Container>
        </TopNav>
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
