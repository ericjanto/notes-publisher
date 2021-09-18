import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

export default function PostTemplate({ data }) {
  const post = data.markdownRemark
  const { title } = post.frontmatter

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />

      <article>
        <header>
          <div className="container">
            <h1>{title}</h1>
          </div>
        </header>
        <div
          id={post.fields.slug}
          className="container text-spacing"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  )
}

PostTemplate.Layout = Layout

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        course
      }
    }
  }
`
