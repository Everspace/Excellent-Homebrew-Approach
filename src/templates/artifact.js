import React from "react"
import { graphql } from "gatsby"
import Layout from "components/layout"
import Ast from "lib/Ast"

export default ({ data }) => {
  const { exaltedArtifact } = data

  return (
    <Layout>
      <h1>{exaltedArtifact.name}</h1>
      <Ast ast={exaltedArtifact.parent.htmlAst} node={exaltedArtifact} />
    </Layout>
  )
}

export const query = graphql`
  query exaltedArtifactQuery($name: String!) {
    exaltedArtifact(name: { eq: $name }) {
      name
      hearthstoneSlots
      equipmentTags
      parent {
        ... on MarkdownRemark {
          htmlAst
        }
      }
    }
  }
`
