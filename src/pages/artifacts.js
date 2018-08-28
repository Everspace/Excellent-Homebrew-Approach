import Layout from "components/layout";
import React from "react"
import { Link, graphql } from "gatsby";

const ArtifactPage = ({data}) => {
  let artifacts = data.allExaltedArtifact.edges.map(({node}) => node)
    .map(node => <li>
        <Link key={node.title} to={node.path}>{node.title}</Link>
      </li>)

  return (
  <Layout>
    <Link to="/">back</Link>
    <h1>Artifacts</h1>
    <ul>
      {artifacts}
    </ul>
  </Layout>
)}

export default ArtifactPage

export const query = graphql`
{
  allExaltedArtifact {
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
