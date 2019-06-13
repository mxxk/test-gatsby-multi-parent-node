import React from 'react'
import { Link } from 'gatsby'

export default ({ children }) => (
  <div>
    <Link to={`/`}>All Posts</Link>
    {` | `}
    <Link to={`/tags`}>All Tags</Link>
    <hr />
    {children}
  </div>
)