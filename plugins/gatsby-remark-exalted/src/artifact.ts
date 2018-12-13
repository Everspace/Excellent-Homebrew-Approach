import {
  baseNode,
  createPageFactory,
  digest,
  getFileNode,
  getManditoryFrontmatter,
  getPathParts,
  pathify,
} from "common"
import { createEvocationNode } from "evocation"
import { resolve } from "path"

const defaultTemplate = resolve(__dirname, "templates/artiftact.tsx")

const makeName = async (props) => {
  const fileNode = await getFileNode(props)

  /** @type {string[]} */
  const parts = await getPathParts(props)
  const isIndexFile = fileNode.name.match(/[iI]ndex/)

  // Construct name
  if (isIndexFile) {
    parts.pop() // get rid of filename index.whatever
    return parts.pop()
  } else {
    // It was just sitting there and still has the . in the name
    const name = parts.pop()
    return name.substring(0, name.lastIndexOf("."))
  }
}

export const createArtifactNode = async (props) => {
  const { node } = props

  if (node.fields.sourceName !== "Artifacts") {
    return null
  }

  // All artifacts have a rating, if they don't they're probably
  // an evocation.
  if (typeof node.frontmatter.rating !== "number") {
    return createEvocationNode(props)
  }

  const result = baseNode(props, "Artifact")
  result.tags = ["Artifact", ...(result.tags || [])]

  result.name = await makeName(props)
  result.title = result.name

  // Set path that this will be.
  // .toLocaleLowercase() // Netlify thing about the lowercasing
  result.path = ["Artifacts"]

  /** @type {string} */
  result.artifactType = await getManditoryFrontmatter("artifactType", props)

  const mantditoryAttributes = []
  const isAWeightyThing = result.artifactType.match(
    /(([Aa]rmou?rs?)|([Ww]eapons?))/,
  )

  if (isAWeightyThing) {
    mantditoryAttributes.push("weight")
  }

  await mantditoryAttributes.forEach(async (attribute) => {
    result[attribute] = await getManditoryFrontmatter(attribute, props)
  })

  // formulate the path
  result.path = pathify("artifacts", result.name)

  return result
}

export const onCreateNode: Gatsby.onCreateNode<{}> = async function(
  props
) {
  const { node, getNode, loadNodeContent, actions, createNodeId } = props
  const { createNode, createParentChildLink } = actions

  // We only care about Spiffy'ing up MarkdownRemark nodes.
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  const makeNode = async (newNode) => {
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
  "./src/templates/artifact.tsx",
  createPageFunction,
)
