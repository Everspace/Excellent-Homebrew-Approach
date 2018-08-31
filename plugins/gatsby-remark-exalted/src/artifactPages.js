import { createPageFactory } from "./common"

let createPageFunction = ({ createPage }, { node }, component) => {
  createPage({
    path: node.path,
    component,
    context: {
      name: node.name,
    },
  })
}

export const createArtifactPages = createPageFactory(
  "Artifact",
  "./src/templates/artifact.js",
  createPageFunction,
)
