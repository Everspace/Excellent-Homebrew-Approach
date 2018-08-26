import crypto from "crypto"

export const digest = node => {
  node.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)
  return node
}

export const baseNode = ({ node, createNodeId }, type) => {
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
