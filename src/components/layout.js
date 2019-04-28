import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import "typeface-work-sans"
import theme from "../../config/theme"
import reset from "../styles/reset"
import Logo from "./logo"
import { Flex } from "../elements"

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.accent};
  }
  html {
    overflow: auto;
    box-sizing: border-box;
    border: 0;
    margin: 0;
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }
    
    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }
    
    @media (max-width: 600px) {
      font-size: 16px;
      
      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  body {
    overflow: auto;
    border: 0;
    margin: 0;
    padding: 0;
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: ${theme.colors.cream};;
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${theme.colors.secondary};
    }
  }
  
  ${reset}
`

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent
    ? { className: "navlink-active navlink" }
    : { className: "navlink" }
}

const PartialNavLink = props => (
  <Link getProps={isPartiallyActive} {...props}>
    {props.children}
  </Link>
)

const SiteWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`

const Main = styled.main`
  position: fixed;
  width: 100%;
  top: ${props => props.theme.siteNavbarHeight.normal};
  height: calc(100vh - ${props => props.theme.siteNavbarHeight.normal});
  overflow-y: scroll;
`

const SiteNav = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  height: ${props => props.theme.siteNavbarHeight.normal};
  align-items: center;
  justify-content: flex-end;
  z-index: 100;
  a {
    text-decoration: none;
    font-size: ${props => props.theme.fontSizes[3]};
    line-height: 1.5;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.tertiary};
    }
    &.navlink-active {
      color: ${props => props.theme.colors.yellow};
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.accent};
      }
    }
    margin-right: 10%;

    @media (max-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${props => props.theme.fontSizes[2]};
      margin-left: ${props => props.theme.space[4]};
      margin-right: ${props => props.theme.space[4]};
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: ${props => props.theme.fontSizes[1]};
      margin-left: ${props => props.theme.space[3]};
      margin-right: ${props => props.theme.space[3]};
    }

    @media (max-width: ${props => props.theme.breakpoints[0]}) {
      font-size: ${props => props.theme.fontSizes[0]};
      margin-left: ${props => props.theme.space[2]};
      margin-right: ${props => props.theme.space[2]};
    }
  }
`
const SiteNavLinks = styled.div`
  a {
    font-family: "aktiv-grotesk-extended", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 22px;
    font-weight: 700;
  }
`

const LogoWrapper = styled.div`
  margin-right: auto;
  max-height: ${props => props.theme.siteNavbarHeight.normal};
  width: ${props => props.theme.sidebarWidth.normal};
  display: flex;
  justify-content: center;
`

const Layout = ({ children, color }) => {
  const data = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <SiteWrapper>
        <GlobalStyles />
        <SiteNav>
          <LogoWrapper>
            <Logo height={theme.siteNavbarHeight.normal} />
          </LogoWrapper>
          <SiteNavLinks>
            {data.navigation.edges.map(({ node: item }) => (
              <PartialNavLink to={item.link} key={item.name}>
                {item.name}
              </PartialNavLink>
            ))}
          </SiteNavLinks>
        </SiteNav>
        <Main>{children}</Main>
      </SiteWrapper>
    </ThemeProvider>
  )
}

export default Layout

const query = graphql`
  query LayoutQuery {
    navigation: allNavigationYaml {
      edges {
        node {
          name
          link
        }
      }
    }
  }
`
