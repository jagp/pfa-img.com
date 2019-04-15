import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import { readableColor } from "polished"
import "typeface-work-sans"
import { Box, Flex } from "../elements"
import theme from "../../config/theme"
import reset from "../styles/reset"
import Logo from "./logo"

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
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: ${theme.colors.cream};
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

const isPartiallyActive = ({
  isPartiallyCurrent
}: {
  isPartiallyCurrent: boolean
}) => {
  return isPartiallyCurrent
    ? { className: "navlink-active navlink" }
    : { className: "navlink" }
}

const PartialNavLink = (props: any) => (
  <Link getProps={isPartiallyActive} {...props}>
    {props.children}
  </Link>
)

const SiteNav = styled(Flex)<{ color: string }>`
  position: fixed;
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
      color: ${props => props.theme.colors.cream};
    }
    &.navlink-active {
      color: ${props => props.theme.colors.accent};
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.accent};
      }
    }
    margin-right: 2%;

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
const SiteNavLinks = styled.div``

const LogoWrapper = styled<any>("div")`
  margin-right: auto;
  max-height: ${props => props.theme.siteNavbarHeight.normal};
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.sidebarWidth.normal} 1fr;
  padding-top: ${props => props.theme.siteNavbarHeight.normal};
  height: calc(100vh - ${props => props.theme.siteNavbarHeight.normal});
`
const Sidebar = styled(Flex)`
  grid-column: 1;
  flex-direction: column;
  position: fixed;
  background-color: ${props => props.theme.colors.secondary};
  height: calc(100vh - ${props => props.theme.siteNavbarHeight.normal});
  width: ${props => props.theme.sidebarWidth.normal};
`

const Toolbar = styled(Flex)<{ color: string }>`
  flex-direction: column;
  a {
    text-decoration: none;
    color: ${props => readableColor(`${props.color}`)};
    font-size: ${props => props.theme.fontSizes[3]};
    line-height: 1.5;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
    &.navlink-active {
      color: ${props => props.theme.colors.secondary};
      F &:hover,
      &:focus {
        color: ${props => props.theme.colors.accent};
      }
    }

    @media (max-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${props => props.theme.fontSizes[2]};
      margin-left: ${props => props.theme.space[4]};
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: ${props => props.theme.fontSizes[1]};
      margin-left: ${props => props.theme.space[3]};
    }

    @media (max-width: ${props => props.theme.breakpoints[0]}) {
      font-size: ${props => props.theme.fontSizes[0]};
      margin-left: ${props => props.theme.space[2]};
    }
  }
`

const ToolbarInner = styled(Box)<{ bg: string }>`
  height: 100%;
  width: ${props => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
`

const Main = styled.main`
  grid-column: 2;
`

const Footer = styled.footer<{ color: string }>`
  width: 100%;
  bottom: 0;
  position: absolute;
  color: ${props =>
    readableColor(`${props.color}`, `${props.theme.colors.cream}`, "#f2e4d6")};

  a {
    color: ${props => readableColor(`${props.color}`)};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
`

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: "white"
}

interface QueryResult {
  navigation: {
    edges: {
      node: {
        name: string
        link: string
      }
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <SiteNav as="nav" flexWrap="nowrap" flexDirection="row">
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
        <Wrapper>
          <Sidebar>
            <Toolbar color={color} as="aside" p={[6, 6, 8]}>
              <Flex
                flexWrap="nowrap"
                flexDirection={["row", "row", "row", "column"]}
                alignItems={["center", "center", "center", "flex-start"]}
                justifyContent="space-between"
              >
                <ToolbarInner
                  color={color}
                  mt={[0, 0, 0, 10]}
                  flexWrap="nowrap"
                  flexDirection={["row", "row", "row", "column"]}
                  alignItems="flex-start"
                >
                  {data.navigation.edges.map(({ node: item }) => (
                    <PartialNavLink to={item.link} key={item.name}>
                      {item.name}
                    </PartialNavLink>
                  ))}
                </ToolbarInner>
              </Flex>
            </Toolbar>
            <Footer color={color}>
              <Box p={[1, 1, 3]} fontSize={0}>
                Donate to Pete For America Here.
              </Box>
            </Footer>
          </Sidebar>
          <Main>{children}</Main>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

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
    toolbarSettings: allNavigationYaml {
      edges {
        node {
          name
          link
        }
      }
    }
  }
`
