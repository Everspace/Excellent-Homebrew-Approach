import typescriptPlugin from "rollup-plugin-typescript2"
import { resolve, basename } from "path"

const plugins = [
  typescriptPlugin({
    tsconfig: resolve(__dirname, "tsconfig.json"),
    cacheRoot: `./.cache/.rts2_cache/${basename(__dirname)}`,
  }),
]

const nodejsModules = ["path", "crypto"]

const otherExternal = ["chalk", "dashify"]

const external = [...nodejsModules, ...otherExternal]

function doEndpoint(name) {
  return {
    input: resolve(__dirname, `${name}.ts`),
    external,
    output: {
      format: "cjs",
      file: resolve(__dirname, `${name}.js`),
    },
    plugins,
  }
}

export default [doEndpoint("gatsby-node")]
