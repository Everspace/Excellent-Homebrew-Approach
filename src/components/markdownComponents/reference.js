import React from "react"
import { css } from "@emotion/core"

const underline = css`
  border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
`

// TODO. Should link to approparate homebrew internally via slugs or something
export const link = ({ r }) => (
  <span className={underline}>
    <em>{r}</em>
  </span>
)

export const book = ({ r }) => (
  <span className={underline}>
    <em>{r}</em>
  </span>
)
