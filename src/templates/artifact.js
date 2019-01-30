import Layout from "components/Layout"
import { graphql, Link } from "gatsby"
import RenderAst from "lib/RenderAst"
import React from "react"
import CharmCard from "components/CharmCard"

export default ({ data }) => {
  const { artifact, allEvocation } = data
  let evocationCards
  if (allEvocation) {
    evocationCards = allEvocation.edges
      .map(({ node }) => node)
      .sort((a, b) => a.essence - b.essence)
      .map(node => <CharmCard key={node.id} node={node} />)
  }

  return (
    <Layout title={artifact.name} description={artifact.description}>
      <Link to="/artifacts">&lt; Artifacts</Link>
      <h1>{artifact.name}</h1>
      <RenderAst node={artifact} />
      <div>{evocationCards}</div>
    </Layout>
  )
}

export const query = graphql`
  query artifactQuery($name: String!) {
    artifact(name: { eq: $name }) {
      name
      attunement
      description
      equipmentTags
      era
      hearthstoneSlots
      ...Ast
    }

    allEvocation(
      filter: { artifact: { eq: $name } }
      sort: { fields: [essence, name], order: ASC }
    ) {
      edges {
        node {
          id
          name
          essence
          keywords
          charms_needed
          cost
          type
          essence
          duration
          ...Ast
        }
      }
    }
  }
`
