import crypto from "crypto"
import path from "path"
import dashify from "dashify"

/**
 * Pulls the filesystem info from the props
 * @param {*} props base props from onCreateNode
 */
export const getFileNode = async props => {
  const { node, getNode } = props

  return await getNode(node.parent)
}

/**
 * Returns relative path as a series of strings
 * @example
 *  let parts = await getPathParts(props)
 *  // parts = ["Accessory", "Handwerksring", "index.md"]
 * @param {} props
 * @returns {string[]} path array
 */
export const getPathParts = async props => {
  const fileNode = await getFileNode(props)
  return fileNode.relativePath.split("/")
}

/**
 * Turn a series of things into a path
 * @param  {...string} args ["a", "Bee Sea"]
 * @returns {string} "/a/bee-sea"
 */
export const pathify = (...args) => {
  return "/" + args.map(dashify).join("/")
}

/**
 * Turn a thing into an anchor to slap on a path  =>
 * @param {string} anchor "Thing Ding Ding"
 * @returns {string} "#thing-ding-ding"
 */
export const anchorate = anchor => {
  return "#" + dashify(anchor)
}

export const digest = node => {
  node.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)
  return node
}

export const baseNode = ({ node, createNodeId }, type) => {
  // Unneeded data
  delete node.frontmatter._PARENT

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

// query is of fn(graphql)
// Creation page function is of signature (actions, edge)
export const createPageFactory = (
  nodeName,
  template,
  createPageFunction,
  query = defaultQuery,
) => {
  return async createPageProps => {
    let { graphql, actions } = createPageProps
    let component = path.resolve(template)

    const result = await query(graphql, nodeName)
    if (result.errors) {
      reject(result.errors)
    }

    result.data[`all${nodeName}`].edges.forEach(edge =>
      createPageFunction(actions, edge, component),
    )
  }
}

export const defaultQuery = (graphql, nodeName) =>
  graphql(`
    {
      all${nodeName} {
        edges {
          node {
            name
            path
          }
        }
      }
    }
  `)
