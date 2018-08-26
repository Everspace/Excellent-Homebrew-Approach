import React from "react"
import { graphql } from "gatsby"
import Ast from "lib/Ast"
import { css } from "emotion"

export const query = graphql`
  {
    allExaltedArtifact {
      edges {
        node {
          name
          attunement
          equipmentTags
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

let pageContent = css`
  /*
    When a react component ends up in a markdown section that would be like a paragraph,
    it replaces the p with a div, and ruins everything.
  */
  & > p {
    display: block; /* Render like div */
  }
  & > div {
    padding-bottom: 1.45rem; /* Render like p for now */
  }
`

export default ({ data }) => {
  let result = data.allExaltedArtifact.edges
    .map(({ node }) => node) // Pull out node from edge
    .map(node => (
      <div key={node.name}>
        <h2>{node.name}</h2>
        <Ast className={pageContent} ast={node.parent.htmlAst} node={node} />
      </div>
    ))

  return result
}
