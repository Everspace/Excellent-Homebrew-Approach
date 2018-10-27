import Layout from "components/Layout"
import { graphql, Link } from "gatsby"
import RenderAst from "lib/RenderAst"
import React from "react"
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
      <Link to="/artifacts">&lt; Artifacts</Link>
      <h1>{artifact.name}</h1>
      <RenderAst node={artifact} />
      <div>{evocationCards}</div>
    </Layout>
  )
}

// export const query = graphql`
//   query splatQuery($name: String!) {
//     splat(name: { eq: $name }) {
//       name
//       attunement
//       equipmentTags
//       hearthstoneSlots
//       ...Ast
//       evocations: children {
//         ... on Evocation {
//           name
//           essence
//           keywords
//           charms_needed
//           cost
//           type
//           essence
//           duration
//           ...Ast
//         }
//       }
//     }
//   }
// `
