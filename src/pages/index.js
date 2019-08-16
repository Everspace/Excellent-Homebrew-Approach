import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

const IndexPage = ({ data }) => {
  const { autoPages } = data
  return (
    <Layout>
      <h1>Here's the stuff that I've made</h1>
      <h2>
        <Link to="/artifacts">Artifacts</Link>
      </h2>
      <h2>
        And misc pages:
    </h2>
      <ul>
        {
          autoPages.nodes.map(({ path, context }) =>
            <li key={path}>
              <Link to={path}>{context.title}</Link>
            </li>
          )
        }
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`{
  autoPages: allSitePage(filter: {pluginCreator: {name: {eq: "default-site-plugin"}}}) {
    nodes {
      path
      context {
        title
      }
    }
  }
}`
