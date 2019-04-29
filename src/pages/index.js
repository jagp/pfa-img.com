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
    this.defaultExtensions = {}
    this.defaultTags = {}
    this.defaultCategories = {}
    // Construct the intiial state objects from the data source
    this.props.data.extensions.edges.map(
      ({ node }) => (this.defaultExtensions[node.title] = true)
    )
    this.props.data.tags.edges.map(
      ({ node }) => (this.defaultTags[node.title] = true)
    )
    this.props.data.categories.edges.map(
      ({ node }) => (this.defaultCategories[node.relativePath] = true)
    )
    this.state = {
      filters: {
        extensions: this.defaultExtensions,
        tags: this.defaultTags,
        categories: this.defaultCategories
      }
    }
    console.log(this.state.filters)
  }

  toggleToolbarItem(e, filterValue, filterType) {
    this.setState(state => {
      //filters: { ...state.filters, extension: e.extension }
      const newExtensions = state.filters.extensions
      const newTags = state.filters.tags
      const newCategories = state.filters.categories

      // This should be refactored with spread operator to replace only needed elements
      if (filterType === "extension") {
        newExtensions[filterValue] = !newExtensions[filterValue]
      }
      if (filterType === "tag") {
        newTags[filterValue] = !newTags[filterValue]
      }
      if (filterType === "category") {
        newCategories[filterValue] = !newCategories[filterValue]
      }

      const newFilters = {
        filters: {
          extensions: newExtensions,
          categories: newCategories,
          tags: newTags
        }
      }

      console.log(e, filterValue, filterType, newFilters)

      return { newFilters }
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
            {data.publicImages.edges.map(({ node }) => (
              <GridItem
                key={node.id}
                to="#"
                visible={
                  filters.extensions[node.extension] &&
                  filters.categories[node.relativeDirectory]
                }
              >
                <MainImageWrapper
                  className={node.extension}
                  title={this.formatName(node.name)}
                  format={node.extension}
                  tags={["tag1", "tag2"]}
                  category={node.relativeDirectory}
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
    publicImages: allFile(filter: { sourceInstanceName: { eq: "imageRepo" } }) {
      totalCount
      edges {
        node {
          ...imageFields
        }
      }
    }
    categories: allDirectory(
      filter: {
        sourceInstanceName: { eq: "imageRepo" }
        relativePath: { ne: "" }
      }
    ) {
      edges {
        node {
          relativePath
          name
        }
      }
    }
    tags: allTagsYaml {
      edges {
        node {
          title
        }
      }
    }
    extensions: allExtensionsYaml {
      edges {
        node {
          title
        }
      }
    }
  }
`
