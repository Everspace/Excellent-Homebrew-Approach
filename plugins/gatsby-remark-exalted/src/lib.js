/**
 *
 */

/**
 * @param {string} path
 * @returns boolean
 */
exports.isIndexFile = (path) => {
  parts = path.split('/')
  return parts[parts.length - 1].indexOf('index') === 0
}
