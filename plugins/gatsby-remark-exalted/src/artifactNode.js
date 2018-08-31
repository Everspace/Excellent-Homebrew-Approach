import { baseNode } from "./common"
import dashify from "dashify"
import { createEvocationNode } from "./evocationNode"

export const createArtifactNode = async props => {
  let { node, getNode } = props

  if (node.fields.sourceName !== "Artifacts") {
    return null
  }

  // All artifacts have a rating, if they don't they're probably
  // an evocation.
  if (!node.frontmatter.rating) {
    return createEvocationNode(props)
  }

  let result = baseNode(props, "Artifact")
  result.tags = ["Artifact", ...(result.tags || [])]

  // Get filenode to operate on

  let fileNode = await getNode(node.parent)

  /** @type {string[]} */
  let parts = fileNode.relativePath.split("/")
  let isIndexFile = fileNode.name.match(/[iI]ndex/)

  // Construct name
  if (isIndexFile) {
    parts.pop() // get rid of filename index.whatever
    result.name = parts.pop()
  } else {
    // It was just sitting there and still has the . in the name
    let name = parts.pop()
    name = name.substring(0, name.lastIndexOf("."))
    result.name = name
  }

  // Set path that this will be.
  // .toLocaleLowercase() // Netlify thing about the lowercasing
  result.path = ["Artifacts"]

  // The title is the name of the artifact by default.
  result.title = result.name

  // Flip so we can grab Base -> Category if it's there or it matters.
  // [Weapon, Heavy] => [Heavy, Weapon]
  parts = parts.reverse()

  let artifactType = parts.pop()

  if (node.frontmatter.artifactType) {
    result.artifactType = node.frontmatter.artifactType
  } else {
    // Handle artifact type if unspecified
    if (artifactType) {
      result.artifactType = artifactType
    }
  }

  // Either way gets the artifact type in it's path.
  result.path.push(result.artifactType)

  let weight = parts.pop()

  // Handle fatness if present for armour and weapons
  if (node.frontmatter.weight) {
    result.weight = node.frontmatter.weight
  } else {
    if (weight) {
      result.weight = weight
    }
  }

  result.path.push(result.weight)

  // The rest are weird user tags
  while (parts.length > 0) {
    result.tags.push(parts.pop())
  }

  result.path.push(result.title)
  // formulate the path
  result.path = result.path
    .filter(item => item)
    .map(dashify)
    .join("/")

  return result
}
