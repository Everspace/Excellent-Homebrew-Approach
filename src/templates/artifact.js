import Layout from "components/layout"
import { graphql, Link } from "gatsby"
import Ast from "lib/Ast"
import React from "react"
import { pageContentClass } from "style/common"
import CharmCard from "components/CharmCard"

export default ({ data }) => {
  const { artifact } = data
  const { evocations } = artifact
  let evocationCards
  if (evocations) {
    evocationCards = evocations
      .sort((a, b) => a.essence - b.essence)
      .map(node => <CharmCard node={node} />)
  }

  return (
    <Layout>
      <Link to="/artifacts">back</Link>
      <h1>{artifact.name}</h1>
      <Ast
        className={pageContentClass}
        ast={artifact.parent.htmlAst}
        node={artifact}
      />
      <div>{evocationCards}</div>
    </Layout>
  )
}

export const query = graphql`
  query artifactQuery($name: String!) {
    artifact(name: { eq: $name }) {
      name
      attunement
      equipmentTags
      hearthstoneSlots
      parent {
        ... on MarkdownRemark {
          htmlAst
        }
      }
      evocations: children {
        ... on Evocation {
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
