import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
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
      edges: {
        node: {
          title: "title"
          slug: "slug"
          cover: ChildImageSharp
        }
      }[]
    }
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 20vw;
  grid-template-areas:
    'public-images public-images public-images public-images public-images';

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'public-images public-images public-images public-images';
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'first-project about-us'
      'three-projects three-projects'
      'three-projects three-projects'
      'three-projects three-projects'
      'public-images public-images';
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'first-project'
      'about-us'
      'three-projects'
      'three-projects'
      'three-projects'
      'public-images';
  }
`

const FirstProject = styled(GridItem)`
  grid-area: first-project;
`

const AboutUs = styled(GridItem)`
  grid-area: about-us;
`

const ThreeProjects = styled.div`
  grid-area: three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`

const PublicImages = styled(GridItem)`
  grid-area:public-images;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const Index: React.FunctionComponent<PageProps> = ({ data: { firstProject, threeProjects, aboutUs, publicImages} }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        {/*<FirstProject to={firstProject.slug}>
          <Img fluid={firstProject.cover.childImageSharp.fluid} />
          <span>{firstProject.title}</span>
        </FirstProject>*/}
        {/*<AboutUs to="/about">
          <Img fluid={aboutUs.childImageSharp.fluid} />
          <span>About</span>
        </AboutUs>*/}
        {/*<ThreeProjects>
          {threeProjects.edges.map(({ node: project }) => (
            <GridItem to={project.slug} key={project.slug}>
              <Img fluid={project.cover.childImageSharp.fluid} />
              <span>{project.title}</span>
            </GridItem>
          ))}
          {console.log(threeProjects)}      
        </ThreeProjects>*/}

        <PublicImages>
          {publicImages.edges.map( ({ node : image }) => ( 
            <GridItem>
              <Img fixed={image.fixed} />
            </GridItem>
            ))}
          {console.log(publicImages)}           
        </PublicImages>
          

      </Area>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    publicImages: allImageSharp {
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
