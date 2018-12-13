type NodeApiFunction = (props: any, puginOptions?: any) => void
type NodeApiFunctionGenerator = (
  moduleName: string,
  api: string,
) => NodeApiFunction[]

/**
 * Grabs an API from a module. For use in collecting them all.
 * @param moduleName name of the part we're checking
 * @param api the part we're grabbing
 */
export const getApi: NodeApiFunctionGenerator = (moduleName, api) => {
  try {
    const m: NodeRequire = require(`./module/${moduleName}.js`)

    if (m[api]) {
      return m[api]
    }
  } catch (e) {
    console.log(
      `Could not import ${moduleName}.${api}: see the following error:`,
    )
    console.log(e)
    throw e
  }
}
