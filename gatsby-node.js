const kebabCase = require(`lodash/kebabCase`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/posts/${path.basename(node.fileAbsolutePath, '.md')}/`,
    })

    node.frontmatter.tags.forEach(tag => createNode({
      tag,
      // Since this code executes per post per tag, defer setting the slug
      // until `onCreateNode` for the new `PostTag` node.
      slug: ``,
      id: createNodeId(`PostTag-${tag}`),
      parent: null,
      children: [],
      internal: {
        type: `PostTag`,
        contentDigest: createContentDigest(``),
      },
    }))

  } else if (node.internal.type === `PostTag`) {
    node.slug = `/tags/${kebabCase(node.tag)}/`
  }
}

exports.sourceNodes = ({ actions, getNodesByType, createNodeId }) => {
  const { createTypes, touchNode } = actions

  createTypes(`
    type PostTag implements Node {
      tag: String!
      slug: String!
    }
  `)

  getNodesByType(`MarkdownRemark`).forEach(node =>
    node.frontmatter.tags.forEach(tag =>
      touchNode({
        nodeId: createNodeId(`PostTag-${tag}`)
      })
    )
  )
}

exports.createPages = async ({ graphql, actions, createContentDigest, createNodeId, getNodesByType }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      allPostTag {
        nodes {
          id
          tag
          slug
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)

  // Create a page for each post.
  data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: { slug: node.fields.slug },
    })
  })

  // Create a page for each post tag.
  data.allPostTag.nodes.forEach(({ tag, slug }) => createPage({
    path: slug,
    component: tagTemplate,
    context: { tag },
  }))
}