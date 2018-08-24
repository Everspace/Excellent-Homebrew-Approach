import React from "react"
import { graphql } from "gatsby";
import Attunement from "../components/Attunement";

export const query = graphql`
{
  allMarkdownRemark {
    edges {
      node {
        fileAbsolutePath
      }
    }
  }
}

`

export default ({data}) => {
  console.log(data)

  return (
    <Attunement cost="3m" />
  )
}
