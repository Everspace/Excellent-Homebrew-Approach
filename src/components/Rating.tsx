import { css } from "emotion"
import PropTypes from "prop-types"
import React from "react"
import { classNames } from "style/common"
import { gatsbyGraphQL } from "../../types/GatsbyGraphQL"

export const dot = "•"

export const artifactRatingSort = (
  a: gatsbyGraphQL.Artifact,
  b: gatsbyGraphQL.Artifact,
) => {
  // Both art N/A
  if (a.rating < 0 && b.rating < 0) {
    return 0
  }
  // A is art NA
  if (a.rating < 0 && b.rating >= 0) {
    return 1
  }
  // B is Art NA
  if (a.rating >= 0 && b.rating < 0) {
    return -1
  }

  if (a.rating === b.rating) {
    return a.name.localeCompare(b.name)
  }

  // Otherwise both 0-5 or more
  return a.rating - b.rating
}

const ratingStyle = css`
  padding-left: 0.25em;
  padding-right: 0.25em;
`
const RatingSpan = (props) => (
  <span {...props} className={classNames(props, ratingStyle)} />
)

const Rating = ({ r, ...props }) => {
  if (r > 0) {
    return <RatingSpan {...props}>{dot.repeat(r)}</RatingSpan>
  }
  if (r === 0) {
    return null
  }

  return <RatingSpan {...props}>N/A</RatingSpan>
}

export default Rating

Rating.propTypes = {
  r: PropTypes.number,
}
