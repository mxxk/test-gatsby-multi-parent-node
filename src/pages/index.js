import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ data }) => (
  <Layout>
    <h1>All Posts</h1>
    <ul>
      {data.allMarkdownRemark.nodes.map(node =>
        <li>
          <Link to={node.fields.slug}>{node.excerpt}</Link>
        </li>
      )}
    </ul>
  </Layout>
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