import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"
//import { Link, StaticQuery, graphql } from "gatsby"

type Props = { title: string } & typeof defaultProps

const SimulatedCheckbox = styled.input`
  & {
    border-width: 1px;
    border-color: ${theme.colors.accent};
    border-style: solid;
  }
  background: ${theme.colors.cream};
  border-radius: 2.5px;
  width: 0.9rem;
  height: 0.9rem;
  box-sizing: border-box;
`

const ToolbarItem = styled.p`
  padding: 0 0 0 5px;
  margin: 0;
`
const ToolbarItemHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0;
`

const ToolbarCheckbox = ({ title }: Props) => (
  <ToolbarItemHolder>
    <SimulatedCheckbox />
    <ToolbarItem>{title}</ToolbarItem>
  </ToolbarItemHolder>
)

export default ToolbarCheckbox
