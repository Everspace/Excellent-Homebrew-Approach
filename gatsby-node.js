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
