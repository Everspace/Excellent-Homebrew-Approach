import crypto from "crypto"
import dashify from "dashify"
import { missingDataError } from "errors"
import path from "path"

interface GetFileNodeProps {
  node: { parent: string }
  getNode: (string) => Promise<any>
}

/**
 * Pulls the filesystem info from the props
 * @param props base props from onCreateNode
 */
export const getFileNode = async (props: GetFileNodeProps) => {
  const { node, getNode } = props
  return getNode(node.parent)
}

/**
 * Returns relative path as a series of strings
 * @example
 *  let parts = await getPathParts(props)
 *  // parts = ["Accessory", "Handwerksring", "index.md"]
 * @param props
 * @returns path array
 */
export const getPathParts = async (props) => {
  const fileNode = await getFileNode(props)
  return fileNode.relativePath.split("/")
}

/**
 * Turn a series of things into a path
 * @param args ["a", "Bee Sea"]
 * @returns "/a/bee-sea"
 */
export const pathify = (...args: string[]) => {
  return "/" + args.map((s) => dashify(s)).join("/")
}

/**
 * Turn a thing into an anchor to slap on a path  =>
 * @param anchor "Thing Ding Ding"
 * @returns "#thing-ding-ding"
 */
export const anchorate = (anchor: string) => {
  return "#" + dashify(anchor)
}

export const digest = (node: any) => {
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
      type,
    },
  }
}

/**
 * @param item key of frontmatter to get
 * @param props from the call
 * @returns the attribute
 */
export const getManditoryFrontmatter = async (item: string, props: any) => {
  const { node } = props
  const parts = await getPathParts(props)
  if (node.frontmatter[item]) {
    return node.frontmatter[item]
  }

  missingDataError(item, parts.join("/"))
}

// query is of fn(graphql)
// Creation page function is of signature (actions, edge)
export const createPageFactory = (
  nodeName,
  template,
  createPageFunction,
  query = defaultQuery,
) => {
  return (createPageProps) => {
    const { graphql, actions } = createPageProps
    const component = path.resolve(template)

    return new Promise((resolve, reject) => {
      query(graphql, nodeName).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data[`all${nodeName}`].edges.forEach((edge) =>
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
