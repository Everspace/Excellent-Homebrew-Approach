import { baseNode, anchorate, pathify } from "./common"
import "core-js/stable";
import "regenerator-runtime/runtime";

export const createEvocationNode = async props => {
  let { node, getNode } = props

  let result = baseNode(props, "Evocation")
  result.tags = ["Evocation", ...(result.tags || [])]

  // Get filenode to operate on

  let fileNode = await getNode(node.parent)

  /** @type {string[]} */
  let parts = fileNode.relativePath.split("/")

  // It was just sitting there and still has the . in the name
  let name = parts.pop()
  name = name.substring(0, name.lastIndexOf("."))
  result.name = name

  // Should be in a folder beside the artifact somehow.
  if (node.frontmatter.artifact) {
    result.artifact = node.frontmatter.artifact
  } else {
    result.artifact = parts.pop()
  }

  result.path = pathify("artifacts", result.artifact) + anchorate(result.name)

  return result
}
