import path from "path"
import { gatsby } from "../types/GatsbyNodeApi"

type CreatePageFunction = (
  boundActionCreators: gatsby.BoundActionCreators,
  properties: { node: any },
  component: any,
) => void

type CreatePageFactoryFunction = (
  nodeName: string,
  templateName: string,
  createPageFunction: CreatePageFunction,
  queryFunction: (graphql: any, nodeName: string) => Promise<any>,
) => gatsby.CreatePages

// query is of fn(graphql)
// Creation page function is of signature (actions, edge)
/**
 *
 * @param nodeName
 * @param templatePath
 * @param createPageFunction
 * @param query
 */
export const createPageFactory: CreatePageFactoryFunction = (
  nodeName: string,
  templatePath: string,
  createPageFunction: CreatePageFunction,
  query = defaultQuery,
) => {
  const newFn: gatsby.CreatePages = (createPageProps) => {
    const { graphql, boundActionCreators } = createPageProps
    const component = path.resolve(templatePath)

    return new Promise((resolve, reject) => {
      query(graphql, nodeName).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data[`all${nodeName}`].edges.forEach((edge) =>
          createPageFunction(boundActionCreators, edge, component),
        )
        resolve()
      })
    })
  }

  return newFn
}

export const defaultQuery = (graphql, nodeName) =>
  graphql(`
    {
      all${nodeName} {
        edges {
          node {
            name
            path
          }
        }
      }
    }
  `)
