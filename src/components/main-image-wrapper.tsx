import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"
//import { Link, StaticQuery, graphql } from "gatsby"

type Props = {
  title: string
  format: string
  tags: string[]
  size: string
} & typeof defaultProps

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const ImageHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > .gatsby-image-wrapper {
    max-height: 100%;
    max-width: 100%;
    position: relative;
  }
`
const ImageOverlay = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  color: white;
  position: absolute;
  background: transparent;
  opacity: 0;
  display: block;
  z-index: 100;
  transition: opacity 0.25s;
  &:hover {
    opacity: 1;
    background: linear-gradient(
      to top,
      rgba(10, 10, 10, 0.85) 0%,
      rgba(10, 10, 10, 0.45) 8%,
      rgba(0, 0, 0, 0) 12.5%
    );
  }
  > aside {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    p {
      margin: 0;
    }
  }
`

const ImageStatsHolder = styled.div`
  width: 95%;
  font-size: 60%;
  text-transform: uppercase;
  position: absolute;
  top: calc(100% + 5px);
  height: 2rem;
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

const OverlayData = ({ tags }) => (
  <aside>
    {tags.map(tag => (
      <p>{tag}</p>
    ))}
  </aside>
)

const MainImageWrapper = ({ title, format, tags, size, children }: Props) => (
  <ImageContainer>
    <ImageHolder>
      <ImageOverlay>
        <OverlayData tags={tags} />
      </ImageOverlay>
      {children}
    </ImageHolder>
    <ImageStatsHolder>
      <div>{title}</div>
      <div>{format}</div>
      <DownloadIcon>
        <img src="/download-icon.png" />
      </DownloadIcon>
    </ImageStatsHolder>
  </ImageContainer>
)

export default MainImageWrapper
