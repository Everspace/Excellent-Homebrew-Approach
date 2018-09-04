import Layout from "components/Layout"
import React from "react"
import { Link, graphql } from "gatsby"
import Rating, { artifactRatingSort } from "components/Rating"

const ArtifactPage = ({ data }) => {
  let artifacts = data.allArtifact.edges
    .map(({ node }) => node)
    .sort(artifactRatingSort)
    .map(node => (
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
