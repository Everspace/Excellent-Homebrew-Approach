import React from "react"
import rehypeReact from "vendor/rehype-react"
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

  ast.properties = props || {}

  return (
    <GatsbyContext.Provider value={node}>
      {renderAst(ast)}
    </GatsbyContext.Provider>
  )
}

export default Ast
