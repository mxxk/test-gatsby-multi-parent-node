import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export default ({ data }) => (
  <Layout>
    <h1>All Tags</h1>
    <ul>
      {data.allPostTag.nodes.map(node =>
        <li>
          <Link to={node.slug}>{node.tag}</Link>
        </li>
      )}
    </ul>
  </Layout>
)

export const query = graphql`
  {
    allPostTag {
      nodes {
        tag
        slug
      }
    }
  }
`