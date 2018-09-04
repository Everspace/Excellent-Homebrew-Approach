// Default layout
// tslint:disable
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import { css } from "emotion"

import Header from "./header"
import "./layout.css"

const headerStyle = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
`

const LayoutRender = ({ sq, description, title, shortTitle, ...props }) => {
  const defaultTitle = sq.site.siteMetadata.title
  const defaultShortTitle = sq.site.siteMetadata.shortTitle
  const defaultDiscription = sq.site.siteMetadata.description

  return (
    <>
      <Helmet
        title={
          title ? `${shortTitle || defaultShortTitle} - ${title}` : defaultTitle
        }
        meta={[
          {
            name: "description",
            content: description || defaultDiscription,
          },
        ]}
      />
      <Header siteTitle={defaultTitle} />
      <div className={headerStyle} {...props} />
    </>
  )
}

/**
 * @param {string} title Bookmark title of page
 * @param {string} description Text blurb on things like discord links
 */
const Layout = ({ title, description, shortTitle, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            shortTitle
            description
          }
        }
      }
    `}
    render={sq =>
      LayoutRender({ sq, title, description, shortTitle, ...props })
    }
  />
)

Layout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  shortTitle: PropTypes.string,

  children: PropTypes.node.isRequired,
}

export default Layout
