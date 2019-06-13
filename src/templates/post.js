import React from 'react'
import { graphql, Link } from 'gatsby'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <h1>
        Post
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      <strong>Tags:</strong>
      <ul>
        {post.frontmatter.tags.map(({ tag, slug, }) => 
          <li>
            <Link to={slug}>{tag}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        tags {
          tag
          slug
        }
      }
    }
  }
`