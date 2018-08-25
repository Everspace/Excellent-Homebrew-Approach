import React from "react"

const GatsbyContext = React.createContext({ node: null })
export default GatsbyContext
export const wrapContext = TheComponent => props => (
  <GatsbyContext.Consumer>
    {node => <TheComponent node={node} {...props} />}
  </GatsbyContext.Consumer>
)
