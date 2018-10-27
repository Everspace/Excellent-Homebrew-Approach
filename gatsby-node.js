require("source-map-support").install()
require("ts-node").register(require("./tsconfig.json"))

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = require("./lib/onCreateWebpackConfig").default
