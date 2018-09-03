import Layout from "components/Layout"
import React from "react"
import { Link, graphql } from "gatsby"

const ArtifactPage = ({ data }) => {
  let artifacts = data.allArtifact.edges.map(({ node }) => node).map(node => (
    <li>
      <Link key={node.title} to={node.path}>
        {node.title}
      </Link>
    </li>
  ))

  return (
    <Layout>
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
          title
          description
        }
      }
    }
  }
`
