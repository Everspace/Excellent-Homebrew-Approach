import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

let components = (data, { children }) => {
  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" },
        ]}
      />
      <div id="top" />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: "0 auto",
          maxWidth: 960,
          padding: "0px 1.0875rem 1.45rem",
          paddingTop: 0,
        }}
      >
        {children}
      </div>
      <div id="bottom" />
    </>
  )
}

const Layout = ({ data, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => components(data, props)}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
