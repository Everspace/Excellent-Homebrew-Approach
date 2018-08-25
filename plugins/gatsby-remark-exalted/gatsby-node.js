const crypto = require("crypto")

const baseNode = ({ node, createNodeId }, type) => ({
  children: [],
  id: createNodeId(`${node.id} >> ${type}`),
  parent: node.id,
  ...node.frontmatter,
  internal: {
    description: `Exalted ${type}`,
    type: type,
  },
})

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

  fileNode = await getNode(node.parent)
  if (!fileNode.name.match(/[iI]ndex/)) {
    return null
  }

  let parts = fileNode.relativePath.split("/")
  let result = baseNode(props, "ExaltedArtifact")
  parts.pop() // get rid of index.whatever
  result.name = parts.pop()
  result.title = result.name
  result.tags = ["Artifact"]
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
