import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

import '../styles/ugly-quick-fix.css'

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
    */
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

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(200, 400px);
  grid-column-gap: 10px;
  grid-template-areas:
    'public-images public-images public-images public-images public-images';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'public-images public-images public-images public-images';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'public-images public-images';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'public-images';
  }
`

const PublicImages = styled(GridItem)`
  grid-area:public-images;
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
				{data.allImageSharp.edges.map(({ node }) => (
					<GridItem to="#">
						<Img fixed={node.fixed} />
					</GridItem>
				))}
			</Area>
		</Layout>
	)
}

export default Index

export const query = graphql`
	query IndexQuery {
		allImageSharp {
			edges {
				node {
					id
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
`
