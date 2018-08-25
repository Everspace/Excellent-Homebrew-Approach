import React from "react"
import { graphql } from "gatsby";
import Ast from "lib/Ast";

export const query = graphql`
{
  allExaltedArtifact {
    edges {
      node {
        name
        parent {
          ... on MarkdownRemark {
          	htmlAst
          }
        }
      }
    }
  }
}
`

/*
<Ast
        key={n.sourceFile.name}
        htmlAst={n.parent.htmlAst}
      />
      */
export default ({data}) => {
  let result = data.allExaltedArtifact.edges
    .map(({node}) => node)
    .map( ({name, parent}) =>
    <div key={name}>
      <h2>{name}</h2>
      <Ast ast={parent.htmlAst} />
    </div>
  )

  return result
}
