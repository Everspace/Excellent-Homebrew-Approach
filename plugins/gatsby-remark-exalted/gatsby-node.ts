import * as artifact from "./src/artifact"

const myModules = [artifact]

type NodeApiFunction = (props: any, puginOptions?: any) => void
type NodeApiFunctionGenerator = (string) => NodeApiFunction[]

const harvestApis: NodeApiFunctionGenerator = (api: string) => {
  return myModules.filter((obj) => obj[api]).map((obj) => obj[api])
}

const onCreateNodeApis = harvestApis("onCreateNode")
export const onCreateNode = (props, pluginOptions) => {
  return onCreateNodeApis.map((fn) => fn(props, pluginOptions))
}

const createPagesApis = harvestApis("createPages")
export const createPages = (props) => {
  return createPagesApis.map((fn) => fn(props))
}
