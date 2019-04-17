import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { animated, useSpring, config } from "react-spring"
import Layout from "../components/layout"
import GridItem from "../components/grid-item"
import MainImageWrapper from "../components/main-image-wrapper"
import SEO from "../components/SEO"
import { ChildImageSharp } from "../types"

import "../styles/ugly-quick-fix.css"

/*
type PageProps = {
  data: {
    /*
    firstProject: {
      title: string
      slug: string
      cover: ChildImageSharp
    }
    threeProjects: {
      edges: {
        node: {
          title: string
          slug: string
          cover: ChildImageSharp
        }
      }[]
    }
    aboutUs: ChildImageSharp

    publicImages: {
      allImageSharp: {
        edges: {
          node: {}
        }
      }
      edges: {
        node: {
          image: ChildImageSharp
        }
      }[]
    }
  }
}
*/

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

const Index: React.FunctionComponent<PageProps> = ({ data }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        {data.allFile.edges.map(({ node }) => (
          <GridItem to="#">
            {console.log(node)}
            <MainImageWrapper
              title={node.childImageSharp.sizes.originalName}
              format=".png"
              tags="tags"
            >
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
  query JaredsLocalImages {
    allFile(filter: { sourceInstanceName: { eq: "imageRepo" } }) {
      totalCount
      edges {
        node {
          childImageSharp {
            sizes(maxWidth: 200, maxHeight: 200) {
              originalName
              ...GatsbyImageSharpSizes
            }
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
