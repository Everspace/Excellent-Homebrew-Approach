import { createPageFactory } from "./common"

let query = graphql =>
  graphql(`
    {
      allExaltedArtifact {
        edges {
          node {
            name
            path
          }
        }
      }
    }
  `)

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
  query,
  "allExaltedArtifact",
  "./src/templates/artifact.js",
  createPageFunction,
)
