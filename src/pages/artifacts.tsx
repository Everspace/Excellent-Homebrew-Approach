import Layout from "components/Layout"
import Rating, { artifactRatingSort } from "components/Rating"
import { graphql, Link } from "gatsby"
import GatsbyLink from "gatsby-link"
import React = require("react")
import { gatsbyGraphQL } from "../../types/GatsbyGraphQL"

type GatsbyQLConnectedFn = (props: { data: gatsbyGraphQL.Query }) => Element

const ArtifactPage: GatsbyQLConnectedFn = ({ data }) => {
  // const artifacts = data.allDirectory.edges[0]
  const artifacts = data.allDirectory.edges
    .map(({ node }) => node)
    .sort(artifactRatingSort)
    .map((node) => (
      <li key={node.id}>
        <Rating r={node.rating} />
        <Link key={node.id} to={node.path}>
          {node.name}
        </Link>{" "}
        - {node.description}
      </li>
    ))

  return (
    <Layout title={"Artifacts"}>
      <Link to="/">back</Link>
      <h1>Artifacts</h1>
      <ul>{artifacts}</ul>
    </Layout>
  )
}

export default ArtifactPage

export const query = graphql`
  {
    allArtifact {
      edges {
        node {
          id
          path
          name
          description
          rating
        }
      }
    }
  }
`
