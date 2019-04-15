import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"
import icon from "../"
//import { Link, StaticQuery, graphql } from "gatsby"

type Props = {
  title: string
  format: string
  tags: string
} & typeof defaultProps

const ImageStatsHolder = styled.div`
  width: 95%;
  font-size: 60%;
  text-transform: uppercase;
  position: absolute;
  top: calc(100% + 5px);
  height: 2em;
  color: ${theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: flex-center;
  div {
    flex-basis: 20%;
  }
`

const DownloadIcon = styled.div`
  margin-left: auto;
  max-width: 30px;
  flex-basis: 20px !important;
  img {
    margin-bottom: 0;
  }
`

const MainImageWrapper = ({ title, format, tags, children }: Props) => (
  <article>
    <figure>{children}</figure>
    <ImageStatsHolder>
      <div>{title}</div>
      <div>{format}</div>
      <div>{tags}</div>
      <DownloadIcon>
        <img src="/download-icon.png" />
      </DownloadIcon>
    </ImageStatsHolder>
  </article>
)

export default MainImageWrapper
