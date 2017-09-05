import * as React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../helpers"
import { Layout } from "../typings"

interface SectionContainerProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
  articleLayout?: Layout
}

const Div: StyledFunction<SectionContainerProps> = styled.div

const chooseWidth = (layout, articleLayout) => {
  if (layout) {
    if (layout === "blockquote" && articleLayout !== "classic") {
      const sectionWidth = articleLayout === "feature" ? "900px;" : "780px;"
      return sectionWidth
    } else if (layout === "overflow_fillwidth" || layout === "blockquote") {
      return "780px;"
    } else if (layout === "fillwidth") {
      return "100%;"
    }
  }
  return "680px;"
}

const chooseMobilePadding = layout => {
  if (layout && layout !== "blockquote") {
    return "0px;"
  } else {
    return "0 20px;"
  }
}

const SectionContainer = Div`
  box-sizing: border-box;
  display: flex;
  width: ${props => chooseWidth(props.layout, props.articleLayout)}
  margin: auto;
  margin-bottom: 40px;
  ${props => pMedia.md`
    width: 100%;
    padding: ${chooseMobilePadding(props.layout)}
    margin: 0 0 40px 0;
  `}
`
export default SectionContainer