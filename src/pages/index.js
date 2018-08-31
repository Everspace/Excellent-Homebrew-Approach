import React from "react"
import { Link } from "gatsby"

import Layout from "components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Here's the stuff that I've made</h1>
    <h2>
      <Link to="/artifacts">Artifacts</Link>
    </h2>
  </Layout>
)

export default IndexPage
