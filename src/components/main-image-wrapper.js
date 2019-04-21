import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"
//import { Link, StaticQuery, graphql } from "gatsby"

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
  &:hover {
    opacity: 1;
  }
`
/* deprecated: 
&:hover {
  opacity: 1;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.85) 0%,
    rgba(10, 10, 10, 0.45) 8%,
    rgba(0, 0, 0, 0) 12.5%
  );
}*/

const ImageStatsHolder = styled.div`
  width: 98%;
  position: absolute;
  top: calc(100% + 5px);
  height: 2rem;
  color: ${theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: flex-center;
  .title {
    width: 80%;
  }
  .format {
    width: 10%;
  }
  p {
    font-family: Arial, sans-serif;
    font-size: 11px;
    margin: 0;
    line-height: 1.2;
    margin-right: 0;
  }
`

const DownloadIcon = styled.div`
  margin-left: auto;
  width: 7%;
  margin-left: 3%;
  img {
    margin-bottom: 0;
    vertical-align: top;
  }
`

const OverlayData = ({ tags }) => (
  <aside>
    {tags.map(tag => (
      <p key={tag}>{tag}</p>
    ))}
  </aside>
)

const MainImageWrapper = ({ title, format, tags, size, children }) => (
  <ImageContainer>
    <ImageHolder>
      <ImageOverlay>
        <OverlayData tags={tags} />
      </ImageOverlay>
      {children}
    </ImageHolder>
    <ImageStatsHolder>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="format">
        <p>{format}</p>
      </div>
      <DownloadIcon>
        <img src="/download-icon.png" />
      </DownloadIcon>
    </ImageStatsHolder>
  </ImageContainer>
)

export default MainImageWrapper
