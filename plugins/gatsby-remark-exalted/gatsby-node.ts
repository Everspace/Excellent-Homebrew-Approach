const myModules = ["artifact"]

type NodeApiFunction = (props: any, puginOptions?: any) => void
type NodeApiFunctionGenerator = (string) => NodeApiFunction[]

const harvestApis: NodeApiFunctionGenerator = (api: string) => {
  return myModules
    .map(name => {
      try {
        return require(`./dist/${name}.js`)
      } catch (e) {
        console.log(
          `Could not import gatsby-remark-exalted/src/${name}.${api}: see the following error:`,
        )
        console.log(e)
        return {}
      }
    })
    .filter(obj => obj[api])
    .map(obj => obj[api])
}

const onCreateNodeApis = harvestApis("onCreateNode")
exports.onCreateNode = (props, pluginOptions) => {
  return onCreateNodeApis.map(fn => fn(props, pluginOptions))
}

const createPagesApis = harvestApis("createPages")
exports.createPages = props => {
  return createPagesApis.map(fn => fn(props))
}
