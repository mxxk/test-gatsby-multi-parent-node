module.exports = {
  pathPrefix: `test-gatsby-multi-parent-node`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/posts/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
  mapping: {
    'MarkdownRemark.frontmatter.tags': `PostTag.tag`,
  },
};