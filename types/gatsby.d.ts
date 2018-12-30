import { graphql } from "gatsby"
import { gatsbyGraphQL } from "./GatsbyGraphQL"

declare namespace gatsby {
  type FunctionComponent = React.FunctionComponent<{
    data: gatsbyGraphQL.Query,
  }>

  export interface PageInput {
    path: string
    component: string
    layout?: string
    context?: any
  }

  export interface BoundActionCreators {
    createPage: (page: PageInput) => void
    deletePage: (page: PageInput) => void
    createRedirect: (
      opts: {
        fromPath: string
        isPermanent?: boolean
        redirectInBrowser?: boolean
        toPath: string,
      },
    ) => void
  }

  export type CreatePages = (
    fns: { graphql: any; boundActionCreators: BoundActionCreators },
  ) => void
}
