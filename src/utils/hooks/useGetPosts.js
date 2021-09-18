import { useStaticQuery, graphql } from 'gatsby'

export const useGetPosts = () => {
  const data = useStaticQuery(graphql`
    query StaticQuery {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              course
              noteType
            }
          }
        }
      }
    }
  `)

  return data
}
