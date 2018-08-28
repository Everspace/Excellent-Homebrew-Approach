import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "components/layout"
import Ast from "lib/Ast"
import { css } from "emotion";

let pageContent = css`
  /*
    When a react component ends up in a markdown section that would be like a paragraph,
    it replaces the p with a div, and ruins everything.
  */
  & > p {
    display: block; /* Render like div */
  }
  & > div {
    padding-bottom: 1.45rem; /* Render like p for now */
  }
`

export default ({ data }) => {
  const { exaltedArtifact } = data

  return (
    <Layout>
      <Link to="/artifacts">back</Link>
      <h1>{exaltedArtifact.name}</h1>
      <Ast className={pageContent} ast={exaltedArtifact.parent.htmlAst} node={exaltedArtifact} />
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
    }
  }
`
