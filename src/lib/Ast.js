import React from "react"
import rehypeReact from "rehype-react"
import * as components from "components/markdownComponents"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components
}).Compiler

const Ast = ({ast, ...props}) => <div {...props}>{renderAst(ast)}</div>

export default Ast
