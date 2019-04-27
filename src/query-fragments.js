import { graphql } from "gatsby"

// Reusable pacages of GraphQL fields
export const siteFragments = graphql`
fragment imageFields on File {
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

`


