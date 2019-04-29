import React from "react"
import styled from "styled-components"
import { Flex, Box } from "../elements"
import { graphql, useStaticQuery } from "gatsby"
import ToolbarCheckbox from "./toolbar-checkbox"

const StyledToolbar = styled(Flex)`
  flexwrap: nowrap;
  alignitems: flex-start;
  justifycontent: space-between;
  flex-direction: column;
  font-size: ${props => props.theme.fontSizes[0]};
  line-height: 1.5;
  a {
    text-decoration: none;
    color: white;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.accent};
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

const ToolbarInner = styled(Box)`
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
const Toolbar = ({ color, filters, toggleToolbarItem }) => {
  const data = useStaticQuery(query)
  return (
    <StyledToolbar>
      <ToolbarInner
        color={color}
        fontSize={[0]}
        flexWrap="nowrap"
        alignItems="flex-start"
      >
        {data.tags.edges.map(({ node: item }) => (
          <ToolbarCheckbox
            key={item.title}
            space={[1]}
            title={item.title}
            checked={filters.extension[item.title]}
            toggleToolbarItem={toggleToolbarItem}
          >
            {item.title}
          </ToolbarCheckbox>
        ))}
      </ToolbarInner>
    </StyledToolbar>
  )
}

export default Toolbar

const query = graphql`
  query ToolbarQuery {
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
