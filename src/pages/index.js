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

const Index = ({ data }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const formatName = uglyName =>
    sanitizeFilename(uglyName, { replacement: "" }).replace(/-/g, " ")

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        {data.JaredsLocalImages.edges.map(({ node }) => (
          <GridItem key={node.id} to="#">
            <MainImageWrapper
              title={node.name}
              format={node.extension}
              tags={["tag1", "tag2"]}
              size={node.prettySize}
            >
              {
                /*Gatsby bug: the object is reporting it does contain a "childImageSharp" property, but when referenced
              it causes a fatal error. The issue was I fed in an animated .gif by accident, so the
              childImageSharp was malformed. This should have been caught at build time.
              <p>{node.name} : {node.hasOwnProperty( "childImageSharp" ) ? "TRUE" : "FALSE"}</p>
              {console.log(node.name)}
              {/*{node.hasOwnProperty( "childImageSharp" ) ? (<Img fixed={node.childImageSharp.fixed} />) : (console.log(node.name)) }}
              */}
              <Img fixed={node.childImageSharp.fixed} />

            </MainImageWrapper>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default Index

export const query = graphql`
query {
  JaredsLocalImages: allFile(
    filter: { sourceInstanceName: { eq: "imageRepo" } }
  ) {
    totalCount
    edges {
      node {
        #filename pieces
        name
        ext
        base

        #directory structure pieces
        root
        dir
        absolutePath
        relativePath

        #gatsby config source
        sourceInstanceName
        relativeDirectory

        #file attributes
        extension
        size
        prettySize

        #ImageSharp
        childImageSharp {
          fixed {
            base64
            tracedSVG
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
            originalName
          }
        }
      }
    }
  }
}
`
