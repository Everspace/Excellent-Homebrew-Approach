import React from "react"
import { css } from "emotion"

const underline = css({
  borderBottom: "1px dotted gray",
})

export const book = ({ name }) => <a style={underline}>{name}</a>
