const crypto = require("crypto")

const baseNode = ({ node, createNodeId }, type) => {
  // Unneeded data
  delete node.frontmatter.__PARENT

  return {
    children: [],
    id: createNodeId(`${node.id} >> ${type}`),
    parent: node.id,
    ...node.frontmatter,
    internal: {
      description: `Exalted ${type}`,
      type: type,
    },
  }
}

const digest = node => {
  node.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)
  return node
}

const makeArtifactNode = async props => {
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

  fileNode = await getNode(node.parent)

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

  // Flip so we can grab Base -> Category if it's there.
  parts = parts.reverse()
  // [Heavy, Weapon]
  if (parts.length > 0) {
    result.category = parts.pop()
  }

  while (parts.length > 0) {
    result.tags.push(parts.pop())
  }
  result = digest(result)

  return result
}

const makeEvocationNode = null
const makeSplatNode = null

const onCreateNode = async function(props, pluginOptions) {
  const { node, getNode, loadNodeContent, actions, createNodeId } = props
  const { createNode, createParentChildLink } = actions

  // 'node',
  // 'traceId',
  // 'parentSpan',
  // 'traceTags',
  // 'pathPrefix',
  // 'actions',
  // 'loadNodeContent',
  // 'store',
  // 'emitter',
  // 'getNodes',
  // 'getNode',
  // 'hasNodeChanged',
  // 'reporter',
  // 'getNodeAndSavePathDependency',
  // 'cache',
  // 'createNodeId',
  // 'tracing'
  // We only care about Spiffy'ing up MarkdownRemark nodes.
  if (node.internal.type !== "MarkdownRemark") {
    return
  }

  toMake = await makeArtifactNode(props)
  if (toMake) {
    createNode(toMake)
    createParentChildLink({ parent: node, child: toMake })
  }

  return
}

exports.onCreateNode = onCreateNode
