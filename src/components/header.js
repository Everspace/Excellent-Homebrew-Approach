// Default layout
// tslint:disable
import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const titleBarStyle = css`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const headerHolderStyle = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const headerStyle = css`
  margin: 0px;
`

const headerLinkStyle = css`
  color: white;
  text-decoration: none;
  cursor: pointer;
`

const Header = ({ siteTitle, css, ...props }) => (
  <div css={[css, titleBarStyle]}>
    <div css={headerHolderStyle}>
      <h1 css={headerStyle}>
        <Link to="/" css={headerLinkStyle}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
