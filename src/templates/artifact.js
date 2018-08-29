import Layout from "components/layout"
import { graphql, Link } from "gatsby"
import Ast from "lib/Ast"
import React from "react"
import { cardClass, pageContentClass } from "style/common"

export default ({ data }) => {
  const { exaltedArtifact } = data
  const children = exaltedArtifact.children
  let childResults
  if (children) {
    childResults = children.map(node => (
      <div id={node.name} className={cardClass}>
        <h2>{node.name}</h2>
        <hr />
        <Ast
          className={pageContentClass}
          ast={node.parent.htmlAst}
          node={exaltedArtifact}
        />
      </div>
    ))
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
