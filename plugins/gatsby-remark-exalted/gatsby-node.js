const crypto = require('crypto')
const { isIndexFile } = require('./src/lib')

const baseNode = ({node, createNodeId, loadNodeContent}, type) => ({
  id: createNodeId(`${node.id} >> ${type}`),
  // html: loadNodeContent(node.html),
  children: [],
  ast: node.htmlAST,
  parent: node.id,
  excerpt: node.excerpt,
  internal: {
    type: type,
    description: `Exalted ${type}`,
    content: node.internal.content,
  }
})

const digest = (node) => {
  node.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)
  return node
}

const makeArtifactNode = (props, basedir) => {
  const {node, createNodeId, loadNodeContent} = props

  /** @type {string} */
  let path = node.fileAbsolutePath

  if (node.fields.sourceName != "Artifacts") {
    console.error(`${path} was not an artifact file\n`)
    return null
  }

  let parts = path.split('/')
  if (!parts[parts.length - 1].indexOf('index') === 0) {
    console.error(`${path} was not an index path\n`)
    return null
  }

  let pathParts = parts.slice(parts.indexOf("Artifacts") + 1)
  let result = baseNode(props, "ExaltedArtifact")
  result.sourceFile = pathParts.pop()
  console.log(result.sourceFile)
  result.name = pathParts.pop()
  result.tags = []
  while(pathParts.length > 0) {
    result.tags.push(pathParts.pop())
  }
  result = digest(result)

  return result
}

const makeEvocationNode = null
const makeSplatNode = null

const onCreateNode = function (
  props,
  { basedir } //plugin options
) {
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
  if ( node.internal.type !== "MarkdownRemark") {
    return
  }

  toMake = makeArtifactNode(props, basedir)
  if (toMake) {
    node.html
    createNode(toMake)
    createParentChildLink({ parent: node, child: toMake })
  }

  return
}

exports.onCreateNode = onCreateNode
