import {
  baseNode,
  pathify,
  digest,
  createPageFactory,
  getPathParts,
} from "./common"
import { createEvocationNode } from "./evocation"
import { MissingDataError } from "errors"

const getArtifactType = async props => {
  let { node } = props
  let parts = await getPathParts(props)
  parts = parts.reverse()
  parts.pop() // name.md

  let artifactType = parts.pop()

  if (node.frontmatter.artifactType) {
    return node.frontmatter.artifactType
  }

  if (artifactType) {
    return artifactType
  }

  throw new MissingDataError("artifactType", parts.join("/"))
}

const makeName = async props => {
  let fileNode = await getFileNode(props)

  /** @type {string[]} */
  let parts = getPathParts(props)
  let isIndexFile = fileNode.name.match(/[iI]ndex/)

  // Construct name
  if (isIndexFile) {
    parts.pop() // get rid of filename index.whatever
    return parts.pop()
  } else {
    // It was just sitting there and still has the . in the name
    let name = parts.pop()
    return name.substring(0, name.lastIndexOf("."))
  }
}

export const createArtifactNode = async props => {
  let { node } = props

  if (node.fields.sourceName !== "Artifacts") {
    return null
  }

  // All artifacts have a rating, if they don't they're probably
  // an evocation.
  if (typeof node.frontmatter.rating !== "number") {
    return await createEvocationNode(props)
  }

  let result = baseNode(props, "Artifact")
  result.tags = ["Artifact", ...(result.tags || [])]

  result.name = await makeName(props)
  result.title = result.name

  // Set path that this will be.
  // .toLocaleLowercase() // Netlify thing about the lowercasing
  result.path = ["Artifacts"]

  result.artifactType = await getArtifactType(props)

  // Flip so we can grab Base -> Category if it's there or it matters.
  // [Weapon, Heavy] => [Heavy, Weapon]

  let weight = parts.pop()

  // Handle fatness if present for armour and weapons
  if (node.frontmatter.weight) {
    result.weight = node.frontmatter.weight
  } else {
    if (weight) {
      result.weight = weight
    }
  }

  // The rest are weird user tags
  while (parts.length > 0) {
    result.tags.push(parts.pop())
  }

  // formulate the path
  result.path = pathify("artifacts", result.name)

  return result
}

/**
 * The Gatsby API
 * @param {*} props
 * @param {*} pluginOptions
 */
export const onCreateNode = async function(props, pluginOptions) {
  const { node, getNode, loadNodeContent, actions, createNodeId } = props
  const { createNode, createParentChildLink } = actions

  // We only care about Spiffy'ing up MarkdownRemark nodes.
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  const makeNode = async newNode => {
    if (!newNode) {
      return
    }
    newNode = digest(newNode)
    createNode(newNode)
    createParentChildLink({ parent: node, child: newNode })
  }

  return createArtifactNode(props).then(makeNode)
}

const createPageFunction = ({ createPage }, { node }, component) => {
  createPage({
    path: node.path,
    component,
    context: {
      name: node.name,
    },
  })
}

export const createPages = createPageFactory(
  "Artifact",
  "./src/templates/artifact.js",
  createPageFunction,
)
