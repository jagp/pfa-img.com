import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import SEO from "../components/SEO"
import Layout from "../components/layout"
import GridItem from "../components/grid-item"
import MainImageWrapper from "../components/main-image-wrapper"
import Toolbar from "../components/toolbar"
import { Box, Flex } from "../elements"
import theme from "../../config/theme"

import sanitizeFilename from "sanitize-filename"

import "../styles/ugly-quick-fix.css"

const Sidebar = styled(Flex)`
  position: fixed;
  width: ${props => props.theme.sidebarWidth.normal};
  flex-direction: column;
  padding: 10px;
  border-right: 4px solid ${props => props.theme.colors.quaternary};
  background-color: ${props => props.theme.colors.yellow};
  height: calc(100vh - ${props => props.theme.siteNavbarHeight.normal});
  color: ${props => props.theme.colors.secondary};
`
const Footer = styled.footer`
  width: 100%;
  bottom: 0;
  position: absolute;
  color: ${props => props.theme.colors.cream};

  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: absolute;
    width: 100%;
  }
`

const GridWrapper = styled.div`
  position: relative;
  width: calc(100% - ${props => props.theme.sidebarWidth.normal});
  left: ${props => props.theme.sidebarWidth.normal};
  padding: ${theme.space[4]};
`

const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.toggleToolbarItem = this.toggleToolbarItem.bind(this)
    // Placeholder initial filters, these will be null to begin
    this.state = {
      //filters: { extension: ["png"], tags: [""], size: [""] }
      filters: { extension: { png: true, jpg: true } }
    }
  }

  toggleToolbarItem(e, data) {
    console.log(e, data)
    this.setState(state => {
      //filters: { ...state.filters, extension: e.extension }
      const newExtensions = state.filters.extension
      //data currently is just the name/title of the extensions, this needs refactor
      newExtensions[data] = !newExtensions[data]

      return { filters: { extension: newExtensions } }
    })
  }

  formatName = uglyName =>
    sanitizeFilename(uglyName, { replacement: "" }).replace(/[-_]/g, " ")

  render() {
    const { data, color } = this.props
    const { filters } = this.state

    return (
      <Layout>
        <SEO />
        <Sidebar>
          <Toolbar
            color={color}
            as="aside"
            p={[1, 1, 4]}
            filters={this.state.filters}
            toggleToolbarItem={this.toggleToolbarItem}
          />
          <Footer color={color}>
            <Box p={[1, 1, 3]} fontSize={0}>
              Donate to Pete For America Here.
            </Box>
          </Footer>
        </Sidebar>
        <GridWrapper>
          <Grid>
            {data.memes.edges.map(({ node }) => (
              <GridItem
                key={node.id}
                to="#"
                /* Searches for the current node's extension in the list of filtered extensions */
                visible={filters.extension[node.extension]}
              >
                <MainImageWrapper
                  title={this.formatName(node.name)}
                  format={node.extension}
                  tags={["tag1", "tag2"]}
                  size={node.prettySize}
                >
                  <Img fixed={node.childImageSharp.fixed} />
                </MainImageWrapper>
              </GridItem>
            ))}
          </Grid>
        </GridWrapper>
      </Layout>
    )
  }
}

export default Index

export const query = graphql`
  query {
    memes: allFile(
      filter: {
        sourceInstanceName: { eq: "imageRepo" }
        relativeDirectory: { eq: "memes" }
      }
    ) {
      totalCount
      edges {
        node {
          ...imageFields
        }
      }
    }
    postedMemes: allFile(
      filter: {
        sourceInstanceName: { eq: "imageRepo" }
        relativeDirectory: { eq: "posted-memes" }
      }
    ) {
      totalCount
      edges {
        node {
          ...imageFields
        }
      }
    }
    jaredsImages: allFile(
      filter: {
        sourceInstanceName: { eq: "imageRepo" }
        relativeDirectory: { eq: "jagp" }
      }
    ) {
      totalCount
      edges {
        node {
          ...imageFields
        }
      }
    }
  }
`
