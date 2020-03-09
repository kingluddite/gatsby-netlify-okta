/* eslint react/prop-types: 0 */ // --> OFF
/* eslint react/no-danger: 0 */ // --> OFF
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

const BlogPost = function Template({
  data, // this prop will be injected by the GraphQL query below
}) {
  const { markdownRemark } = data // data.markdownRemark hold your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    // markdownRemark.frontmatter: PropType.string
  }),
}

BlogPost.defaultProps = {
  data: {},
}

export default BlogPost
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
