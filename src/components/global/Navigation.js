import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";
import { Link } from "gatsby";

import { Container, Row, Column } from "../../layout/bootstrap";
import StarIcon from "../../images/svgs/star.svg";

const NavigationPadding = styled.div`
  height: 64px;
  position: relative;
  width: 100%;
`;

const NavigationElement = styled.nav`
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;

    z-index: 9999;
    height: 64px;
  }

  width: 100%;
  padding-top: 50px;
  padding-bottom: 120px;
`;

const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const PimaryItem = styled.li`
  font-size: 32px;
  font-weight: 500;

  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 16px;

  &.first {
    margin-left: auto;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  &.active {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Star = styled.img`
  margin-top: -5px;
  margin-right: 8px;
`;

const Fixed = false;
export class Navigation extends React.Component {
  render() {
    const navigation = this.props.data.allContentfulNavigation.nodes[0];
    const { title, links } = navigation;

    return (
      <>
        {Fixed && <NavigationPadding />}
        <NavigationElement className={Fixed && "fixed"}>
          <Container>
            <Row>
              <Column className="col-12" direction="row">
                <LinkList>
                  <PimaryItem>
                    <Star src={StarIcon} />
                    <Link to="/">{title}</Link>
                  </PimaryItem>
                  {links.map((link, i) => {
                    return (
                      <NavItem key={i} className={i === 0 && "first"}>
                        <NavLink to={link.url} activeClassName="active">
                          {link.title}
                        </NavLink>
                      </NavItem>
                    );
                  })}
                </LinkList>
              </Column>
            </Row>
          </Container>
        </NavigationElement>
      </>
    );
  }
}

const NavigationHOC = props => (
  <StaticQuery
    query={query}
    render={data => <Navigation {...props} data={data} />}
  />
);

export default NavigationHOC;

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
