import CharmCard from "components/CharmCard"
import Layout from "components/layout"
import { graphql, Link } from "gatsby"
import Ast from "lib/Ast"
import React from "react"
import { pageContentClass } from "style/common"

export default ({ data }) => {
  const { exaltedArtifact } = data
  const children = exaltedArtifact.children
  let childResults
  if (children) {
    childResults = children
      .sort((a, b) => a.essence - b.essence)
      .map(node => <CharmCard node={node} />)
  }

  return (
    <Layout>
      <Link to="/artifacts">back</Link>
      <h1>{exaltedArtifact.name}</h1>
      <Ast
        className={pageContentClass}
        ast={exaltedArtifact.parent.htmlAst}
        node={exaltedArtifact}
      />
      <div>{childResults}</div>
    </Layout>
  )
}

export const query = graphql`
  query exaltedArtifactQuery($name: String!) {
    exaltedArtifact(name: { eq: $name }) {
      name
      attunement
      equipmentTags
      hearthstoneSlots
      parent {
        ... on MarkdownRemark {
          htmlAst
        }
      }
      children {
        ... on ExaltedArtifactEvocation {
          name
          essence
          keywords
          charms_needed
          cost
          type
          essence
          duration
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
