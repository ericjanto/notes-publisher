const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Eric Janto',
    author: {
      name: 'Eric Janto',
    },
    pathPrefix: '/',
    siteUrl: 'https://www.notes.ericjanto.com',
    description:
      'CS Notes',
    feedUrl: 'https://www.notes.ericjanto.com/rss.xml',
    logo: 'https://www.notes.ericjanto.com/logo.png',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================

    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eric Janto',
        short_name: 'Eric Janto',
        description:
          'CS Notes',
        start_url: '/',
        background_color: 'white',
        theme_color: '#5183f5',
        display: 'minimal-ui',
        icon: `static/pencil.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'hello@taniarascia.com' },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        title
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'CS Notes Eric Janto| RSS Feed',
          },
        ],
      },
    },

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'notes',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents"
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          }
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: 'icase',
          tokenize: 'forward',
          async: false,
        },
        query: `
          {
            allMarkdownRemark(filter: { frontmatter: { template: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  title
                  course
                  slug
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'course'],
        store: ['id', 'slug', 'title', 'course'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            course: node.frontmatter.course,
            noteType: node.frontmatter.noteType,
          })),
      },
    },
  ],
}
