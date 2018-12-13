require("source-map-support").install()

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
path = require("path")

const func = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src")],
    },
  })

  switch (stage) {
    case `develop`:
      actions.setWebpackConfig({
        devtool: `inline-module-source-map`,
      })
      break
  }
}

exports.onCreateWebpackConfig = func
