import React from "react"
import { graphql } from "gatsby"
import Layout from "components/Layout";

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, excerpt, html, tableOfContents } = markdownRemark
  const { title } = frontmatter
  return (
    <Layout title={title} description={excerpt} toc={tableOfContents}>
      <h1>{title}</h1>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout >
  )
}

export const pageQuery = graphql`
query($id: String!) {
  markdownRemark(id: { eq: $id } ) {
    excerpt
    html
    tableOfContents(pathToSlugField: "frontmatter.path")
    frontmatter {
      path
      title
    }
  }
}
`
