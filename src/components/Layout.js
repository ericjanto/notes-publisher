import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { GlobalHotKeys } from 'react-hotkeys';

import favicon from '../assets/pencil.png'
import { Sidebar } from './Sidebar'
import { FileHeader } from './FileHeader'

import '../style.css'
import '../code-style.css'

require(`katex/dist/katex.min.css`)

function getMainClass(collapsed) {
  let classString = ''
  if (collapsed) {
    classString += 'collapsed'
  }

  return classString
}

export const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const keyMap = {
    TOGGLE_SIDEBAR: 'command+b'
  };

  const handlers = {
    TOGGLE_SIDEBAR: event => setCollapsed((prev) => !prev)
  };

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <div className={getMainClass(collapsed)}>
        <Sidebar />
        <FileHeader
          setCollapsed={setCollapsed}
        />
        <main>{children}</main>
      </div>
    </>
  )
}
