import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { animated, useSpring, config } from "react-spring"
import Layout from "../components/layout"
import GridItem from "../components/grid-item"
import MainImageWrapper from "../components/main-image-wrapper"
import SEO from "../components/SEO"
import * as sanitizeFilename from "sanitize-filename"

//import { ChildImageSharp } from "../types"

import "../styles/ugly-quick-fix.css"

const Area = styled(animated.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
  }
`

const PublicImages = styled(GridItem)`
  grid-area: public-images;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

class Index extends React.Component {
  // Placeholder initial filters, these will be null to begin
  state = { filters: { extension: ["jpg", "png"] } }

  formatName = uglyName =>
    sanitizeFilename(uglyName, { replacement: "" }).replace(/[-_]/g, " ")

  render() {
    const { data, filters } = this.props

    return (
      <Layout>
        <SEO />
        <Area>
          {data.memes.edges.map(({ node }) => {
            return (
              <GridItem
                key={node.id}
                to="#"
                /* Searches for the current node's extension in the list of filtered extensions */
                visible={true}
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
            )
          })}
        </Area>
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
