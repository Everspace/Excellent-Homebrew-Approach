let myModules = ["artifact"]

/**
 * Get all api from available modules
 * @param {string} api Api name
 * @returns {function[]} valid functions
 */
let harvestApis = api => {
  return myModules
    .map(name => {
      try {
        return require(`./${name}`)
      } catch (e) {
        console.error(`Couldn't require ./${name}`)
        return {}
      }
    })
    .filter(obj => obj[api])
    .map(obj => obj[api])
}

export const onCreateNode = async function(props, pluginOptions) {
  return harvestApis("onCreateNode").map(fn => fn(props, pluginOptions))
}

export const createPages = async props => {
  return harvestApis("createPages").map(fn => fn(props))
}
