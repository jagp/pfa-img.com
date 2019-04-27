import styled from "styled-components"
import { Link } from "gatsby"
import theme from "../../config/theme"

const GridItem = styled(Link)`
  height: 212px;
  width: 212px;
  display: flex;
  display: ${props => (props.filtersPassed ? "block" : "none")};
  border: 1px solid ${theme.colors.primary};
  margin: ${theme.space[2]} ${theme.space[2]} ${theme.space[8]}
    ${theme.space[2]};
  border-radius: 5px;
  position: relative;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
  > span {
    z-index: 10;
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    text-align: right;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes[4]};
    padding: ${props => props.theme.space[6]};
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      font-size: ${props => props.theme.fontSizes[3]};
      padding: ${props => props.theme.space[5]};
    }
  }
  &:hover {
    background: ${theme.colors.secondary};
  }
  &:after {
    content"placeholder"display: block;
    position: absolute;
    top: 100%;
  }
`

export default GridItem
