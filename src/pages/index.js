import React from 'react'
import { graphql, Link } from 'gatsby'

export default ({ data }) => (
  <div>
    <h1>All Posts</h1>
    <ul>
      {data.allMarkdownRemark.nodes.map(node =>
        <li>
          <Link to={node.fields.slug}>{node.excerpt}</Link>
        </li>
      )}
    </ul>
  </div>
)

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        excerpt(pruneLength: 15)
        fields {
          slug
        }
      }
    }
  }
`