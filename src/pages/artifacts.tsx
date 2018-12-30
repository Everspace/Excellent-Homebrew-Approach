import Layout from "components/Layout"
import Rating, { artifactRatingSort } from "components/Rating"
import { graphql, Link } from "gatsby"
import { node } from "prop-types"
import React from "react"
import { gatsby } from "../../types/gatsby"
import { gatsbyGraphQL } from "../../types/GatsbyGraphQL"

const Artifact: React.FunctionComponent<{
  artifact: gatsbyGraphQL.Artifact,
}> = ({ artifact }) => {
  return (
    <>
      <Rating r={artifact.rating} />
      <Link key={artifact.id} to={artifact.path}>
        {artifact.name}
      </Link>{" "}
      - {artifact.description}
    </>
  )
}

const Group: React.FunctionComponent<{
  group: gatsbyGraphQL.ArtifactGroupConnectionConnection,
}> = ({ group }) => {
  return (
    <>
      <h2 key={group.fieldValue}>{group.fieldValue}</h2>
      <ul key={group.fieldValue + "ul"}>
        {group.edges.filter((edge) => edge.node).map((edge, index) => (
          <li key={index}>
            <Artifact artifact={edge.node} />
          </li>
        ))}
      </ul>
    </>
  )
}

const ArtifactPage: gatsby.FunctionComponent = ({ data }) => {
  const artifacts = data.allArtifact.group.map((edge) => <Group group={edge} />)
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
    allArtifact(sort: { fields: [artifactType, rating, name], order: ASC }) {
      pageInfo {
        hasNextPage
      }
      group(field: artifactType) {
        fieldValue
        totalCount
        pageInfo {
          hasNextPage
        }
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
  }
`
