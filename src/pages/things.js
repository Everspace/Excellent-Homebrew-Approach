import React from "react"
import { graphql } from "gatsby"
import Ast from "lib/Ast"

export const query = graphql`
  {
    allExaltedArtifact {
      edges {
        node {
          name
          attunementCost
          hearthstoneSlots
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

export default ({ data }) => {
  let result = data.allExaltedArtifact.edges
    .map(({ node }) => node) // Pull out node from edge
    .map(node => (
      <div key={node.name}>
        <h2>{node.name}</h2>
        <Ast ast={node.parent.htmlAst} node={node} />
      </div>
    ))

  return result
}
