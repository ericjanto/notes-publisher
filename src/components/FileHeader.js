import React from 'react'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'

export const FileHeader = ({ setCollapsed }) => {
  return (
      <header className="file-header">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          title="Collapse Sidebar (Cmd + B)"
        >
          <Hamburger />
        </button>
        <Link to="/about">
          <h4>
            Eric's CS Notes
          </h4>
        </Link>
      </header>
  )
}
