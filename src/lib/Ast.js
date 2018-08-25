import React from "react"
import rehypeReact from "rehype-react"
import * as components from "components/markdownComponents"
import GatsbyContext from "lib/GatsbyContext"

const renderAst = new rehypeReact({
  components,
  createElement: React.createElement,
}).Compiler

const Ast = ({ ast, node, ...props }) => {
  if (!node) {
    console.log("Node was missing when going to render Ast!", props)
  }
  return (
    <GatsbyContext.Provider value={node}>
      <div {...props}>{renderAst(ast)}</div>
    </GatsbyContext.Provider>
  )
}

export default Ast
