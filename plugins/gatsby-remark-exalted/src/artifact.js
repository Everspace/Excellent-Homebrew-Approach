import {
  baseNode,
  pathify,
  digest,
  createPageFactory,
  getPathParts,
  getFileNode,
} from "./common"
import { createEvocationNode } from "./evocation"
import { missingDataError } from "./errors"

/**
 *
 * @param {string} item
 * @param {*} props
 * @returns {string} the attribute
 */
const getManditoryFrontmatter = async (item, props) => {
  const { node } = props
  let parts = await getPathParts(props)
  if (node.frontmatter[item]) {
    return node.frontmatter[item]
  }

  missingDataError(item, parts.join("/"))
}

const makeName = async props => {
  let fileNode = await getFileNode(props)

  /** @type {string[]} */
  const parts = await getPathParts(props)
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

  /** @type {string} */
  result.artifactType = await getManditoryFrontmatter("artifactType", props)

  let mantditoryAttributes = []
  const isAWeightyThing = result.artifactType.match(
    /(([Aa]rmou?rs?)|([Ww]eapons?))/,
  )

  if (isAWeightyThing) {
    mantditoryAttributes.push("weight")
  }

  await mantditoryAttributes.forEach(async attribute => {
    result[attribute] = await getManditoryFrontmatter(attribute, props)
  })

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
