declare namespace Gatsby {
  /** An object with an id, parent, and children */
  export interface Node {
    id: string /** The id of the node. */
    parent?: Node | null /** The parent of this node. */
    children?: Array<Node | null> | null /** The children of this node. */
  }

  export interface PageInput {
    path: string
    component: string
    layout?: string
    context?: any
  }

  export interface BoundActionCreators {
    createPage: (page: PageInput) => void
    deletePage: (page: PageInput) => void
    createRedirect: (
      opts: {
        fromPath: string
        isPermanent?: boolean
        redirectInBrowser?: boolean
        toPath: string,
      },
    ) => void
  }

  export type CreatePages = (
    fns: { graphql: any; boundActionCreators: BoundActionCreators },
  ) => void

  export type actionOptions = any

  export interface onCreateNodeProps {
    node: createNodeOptions
    getNode: () => any
    loadNodeContent: () => any
    createNodeId: () => string
    actions: {
      createNode: createNode
      createParentChildLink: (options: {
        parent: Node, child: Node
      }) => any,
    }
  }

  export type onCreateNode<pluginOptionsType> = (
    props: onCreateNodeProps,
    pluginOptions: pluginOptionsType,
  ) => void

  export interface NodeInternalData {
    /**
     * An optional field to indicate to transformer plugins that your node has
     * raw content they can transform. Use either an official media type
     * (we use mime-db as our source (https://www.npmjs.com/package/mime-db) or
     * a made-up one if your data doesn’t fit in any existing bucket.
     * Transformer plugins use node media types for deciding if they should
     * transform a node into a new one. E.g. markdown transformers look for
     * media types of text/markdown.
     */
    mediaType?: string

    /**
     * An arbitrary globally unique type choosen by the plugin creating the
     * node. Should be descriptive of the node as the type is used in forming
     * GraphQL types so users will query for nodes based on the type choosen
     * here. Nodes of a given type can only be created by one plugin.
     */
    type: string

    /**
     * An optional field. The raw content of the node. Can be excluded if it’d
     * require a lot of memory to load in which case you must define a
     * loadNodeContent function for this node.
     */
    content?: string

    /**
     * the digest for the content of this node. Helps Gatsby avoid doing extra
     * work on data that hasn’t changed.
     */
    contentDigest: string

    /**
     * An optional field. Human readable description of what this node
     * represent / its source. It will be displayed when type conflicts are
     * found, making it easier to find and correct type conflicts.
     */
    description: string
  }

  export interface createNodeOptions extends Node {
    internal: NodeInternalData
  }

  export type createNode = (
    NodeData: createNodeOptions,
    actionOptions?: any,
  ) => void
}
