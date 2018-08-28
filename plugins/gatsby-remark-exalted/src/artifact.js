import { baseNode } from "./common"

export const makeArtifactNode = async props => {
  let { node, getNode } = props

  if (node.fields.sourceName !== "Artifacts") {
    return null
  }

  // All artifacts have a rating, if they don't they're probably
  // an evocation.
  if (!node.frontmatter.rating) {
    return null
  }

  let result = baseNode(props, "ExaltedArtifact")
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

  // The title is the name of the artifact by default.
  result.title = result.name

  // Set path that this will be.
  // .toLocaleLowercase() // Netlify thing about the lowercasing
  result.path = "/" + result.title

  // Flip so we can grab Base -> Category if it's there.
  // [Weapon, Heavy] => [Heavy, Weapon]
  parts = parts.reverse()
  if (parts.length > 0) {
    result.artifactType = parts.pop()
  }

  // Deal with equipment weight
  if (parts.length > 0) {
    result.artifactCategory = parts.pop()
  }

  // The rest are weird user tags
  while (parts.length > 0) {
    result.tags.push(parts.pop())
  }

  return result
}
