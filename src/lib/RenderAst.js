import React from "react"
import rehypeReact from "vendor/rehype-react"
import * as components from "components/markdownComponents"
import GatsbyContext from "lib/GatsbyContext"
import { pageContentClass } from "style/common"

const renderAst = new rehypeReact({
  components,
  createElement: React.createElement,
}).Compiler

const RenderAst = ({ node, ...props }) => {
  if (!node) {
    console.log("Node was missing when going to render Ast!", props)
  }

  const {
    parent: { htmlAst },
  } = node

  htmlAst.properties = props || {}
  let { className = "" } = props

  if (className.indexOf(pageContentClass) < 0) {
    className = `${className} ${pageContentClass}`
  }

  htmlAst.properties.className = className

  return (
    <GatsbyContext.Provider value={node}>
      {renderAst(htmlAst)}
    </GatsbyContext.Provider>
  )
}

export default RenderAst
