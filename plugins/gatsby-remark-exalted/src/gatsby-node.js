import { createArtifactNode } from "./artifactNode"
import { createArtifactPages } from "./artifactPages"
import { digest } from "./common"

export const onCreateNode = async function(props, pluginOptions) {
  const { node, getNode, loadNodeContent, actions, createNodeId } = props
  const { createNode, createParentChildLink } = actions

  // We only care about Spiffy'ing up MarkdownRemark nodes.
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  const makeNode = newNode => {
    if (!newNode) {
      return
    }
    newNode = digest(newNode)
    createNode(newNode)
    createParentChildLink({ parent: node, child: newNode })
  }

  return createArtifactNode(props).then(makeNode)
}

export const createPages = props => {
  createArtifactPages(props)
}
