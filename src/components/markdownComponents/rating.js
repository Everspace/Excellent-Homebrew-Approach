import React from "react"
import Rating from "../Rating"

/**
 * Wrapper around Rating
 */
export const rating = ({ r }) => {
  try {
    r = Number(r)
  } catch (e) {
    throw new Error(`Rating ${r} was garbage! error: ${e}`)
  }

  return <Rating r={r} />
}
