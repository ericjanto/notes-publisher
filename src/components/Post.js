import React from 'react'
import { Link } from 'gatsby'

export const Post = ({ node, query }) => {

  const getTitle = (title, query) => {
    if (query) {
      const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      const highlightStart = title.search(re)

      if (highlightStart !== -1) {
        const highlightEnd = highlightStart + query.length

        return (
          <h3>
            {title.slice(0, highlightStart)}
            <strong className="highlighted">
              {title.slice(highlightStart, highlightEnd)}
            </strong>
            {title.slice(highlightEnd)}
          </h3>
        )
      }
      return <h3>{title}</h3>
    }
    return <h3>{title}</h3>
  }

  return (
    <Link to={node.slug} key={node.id} className={isNew ? 'post new' : 'post'}>
      {getTitle(node.title, query)}
    </Link>
  )
}
