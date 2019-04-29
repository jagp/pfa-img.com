import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"
//import { Link, StaticQuery, graphql } from "gatsby"

/*
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
*/

const ToolbarItemHolder = styled.label`
  display: flex;
  align-items: start;
  .title {
    line-height: 1;
    color: ${theme.colors.secondary};
    text-transform: uppercase;
    font-size: 12px;
    line-height: inherit;
    letter-spacing: 0.25px;
  }
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? theme.colors.orange : "transparent")};
  border-radius: 3px;
  transition: all 150ms;
  margin-right: 5px;
  border: 1px solid ${theme.colors.primary};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px transparent;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
    transform: translateY(-3px);
  }
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 16px;
  margin-bottom: 8px;
`

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

class SimulatedCheckbox extends React.Component {
  //state = { checked: false }
  constructor(props) {
    super(props)
  }

  toggleToolbarItem = event =>
    this.props.toggleToolbarItem(
      event.target.checked,
      this.props.title,
      this.props.filterType
    ) //this.setState({ checked: event.target.checked })

  render() {
    return (
      <ToolbarItemHolder>
        <Checkbox
          checked={this.props.checked}
          onChange={this.toggleToolbarItem}
        />
        <span className="title">{this.props.title}</span>
      </ToolbarItemHolder>
    )
  }
}

export default SimulatedCheckbox

/*
const ToolbarItem = styled.p`
  font-size: 13px;
  text-transform: uppercase;
  font-family: "Industry", sans-serif;
  padding: 0 0 0 5px;
  margin: 0;
  color: ${theme.colors.secondary};
`

const ToolbarItemHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0;
`
*/
