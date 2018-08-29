import { createArtifactNode } from "./artifactNode"
import { createArtifactPages } from "./artifactPages"
import { digest } from "./common"

let artifactToIds = {
  // name: {
  //   id: ....
  //   nodes: []
  // }
}

const linkNodes = async (newNode, createParentChildLink, get) => {
  let artifact = newNode.artifact ? newNode.artifact : newNode.name

  // Make the object to hold if missing.
  if (!artifactToIds[artifact]) {
    artifactToIds[artifact] = {
      nodes: [],
    }
  }

  let thingus = artifactToIds[artifact]

  let parent = null
  let child = null

  // if this is an ExaltedArtifact
  if (artifact === newNode.name) {
    // check if id' yet
    if (!thingus.id) {
      thingus.id = newNode.id
    }
    // and this would be the parent
    parent = newNode
  } else {
    // This is an evocation and we should log our id
    thingus.nodes.push(newNode.id)
    // and we're the child
    child = newNode

    // And if the parent node was already created
    if (thingus.id) {
      // We should get that
      parent = await get(thingus.id)
    } else {
      // We can't link anything
      return
    }
  }

  if (parent && child) {
    // Link the two
    createParentChildLink({ parent, child })
    // since we already pushed the last id in,
    // we can pop and do the nice link and not waste time
    // on getting the node we have already
    thingus.nodes.pop()
    // Then go and do the rest
    thingus.nodes.map(async evocationID => {
      child = await get(evocationID)
      createParentChildLink({ parent, child })
    })
  }
}

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
    await linkNodes(newNode, createParentChildLink, getNode)
  }

  return createArtifactNode(props).then(makeNode)
}

export const createPages = props => {
  createArtifactPages(props)
}
