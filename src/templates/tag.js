import React from 'react'
import { graphql, Link } from 'gatsby'

export default ({ pageContext, data }) => {
  return (
    <div>
      <h1>
        Posts
      </h1>
      <h2>Tag: {pageContext.tag}</h2>
      <hr />
      <ul>
        {data.allMarkdownRemark.nodes.map(node =>
          <li>
            <Link to={node.fields.slug}>{node.excerpt}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { elemMatch: { tag: { eq: $tag } } } } }
    ) {
      nodes {
        excerpt(pruneLength: 15)
        fields {
          slug
        }
      }
    }
  }
`