/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  switch (stage) {
    case `develop`:
      actions.setWebpackConfig({
        devtool: `inline-module-source-map`,
      })
      break
  }
}

const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/post.js`)
  const result = await graphql(`{
    allMarkdownRemark(filter: {fields: {sourceName: {eq: "Pages"}}}) {
      nodes {
        id
        frontmatter {
          path
          title
        }
      }
    }
  }`)

  if (result.errors) {
    console.log(result.errors)
    throw new Error("Things broke, see console output above")
  }

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        id: node.id,
        title: node.frontmatter.title
      }
    })
  })
}
