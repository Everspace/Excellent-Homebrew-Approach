// Default layout
// tslint:disable
import React from "react"
import { Link } from "gatsby"
import { css } from "emotion"
import { classNames } from "style/common"

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

const Header = ({ siteTitle, ...props }) => (
  <div className={classNames(props, titleBarStyle)}>
    <div className={headerHolderStyle}>
      <h1 className={headerStyle}>
        <Link to="/" className={headerLinkStyle}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
