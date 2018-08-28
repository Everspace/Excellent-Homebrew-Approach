/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
let path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const artifactTemplate = path.resolve("./src/templates/artifact.js")

  return new Promise((resolve, reject) => {
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
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      result.data.allExaltedArtifact.edges.forEach(({ node }) => {
        createPage({
          path: node.path,
          component: artifactTemplate,
          context: {
            name: node.name,
          },
        })
      })
      resolve()
    })
  })
}
