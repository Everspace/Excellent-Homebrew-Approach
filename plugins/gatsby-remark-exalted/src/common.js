import crypto from "crypto"
import path from "path"

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
  return createPageProps => {
    let { graphql, actions } = createPageProps
    let component = path.resolve(template)

    return new Promise((resolve, reject) => {
      query(graphql, nodeName).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data[`all${nodeName}`].edges.forEach(edge =>
          createPageFunction(actions, edge, component),
        )
        resolve()
      })
    })
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
