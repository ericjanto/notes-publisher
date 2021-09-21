import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

import { useGetPosts } from '../utils/hooks/useGetPosts'
import { getSimplifiedPosts, getNoteTypeFromPosts, getCourseFromPosts, prettyPrintNotes } from '../utils/helpers'
import { File } from '../assets/File'
import Filter from './Filter'

export const Sidebar = () => {
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState({}) // eslint-disable-line
  const data = useGetPosts()
  const posts = data.allMarkdownRemark.edges

  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const noteTypes = useMemo(
    () => getNoteTypeFromPosts(simplifiedPosts),
    [simplifiedPosts]
  )
  const courses = useMemo(
    () => getCourseFromPosts(simplifiedPosts),
    [simplifiedPosts]
  )

  const [selectedNoteTypes, setSelectedNoteTypes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(undefined);

  const handleSelectCourse = course => {
    const isSelected = selectedCourse === course;
    const newSelection = isSelected
      ? undefined
      : course;
    setSelectedCourse(newSelection);
  };

  const handleSelectNoteTypes = noteType => {
    const isSelected = selectedNoteTypes.includes(noteType);
    const newSelection = isSelected
      ? selectedNoteTypes.filter(currentNote => currentNote !== noteType)
      : [...selectedNoteTypes, noteType];
    setSelectedNoteTypes(newSelection);
  };

  const filterLabel = (selectedNoteTypes, selectedCourse) => {
    if (!selectedCourse && (!selectedNoteTypes || selectedNoteTypes.length === 0)) {
      return "Filter by: All"
    } else {
      if (!selectedCourse) {
        return "Filter by: " + prettyPrintNotes(selectedNoteTypes)
      } else if (!selectedNoteTypes || selectedNoteTypes.length === 0) {
        return "Filter by: " + selectedCourse
      } else {
        return `Filter by: ${selectedCourse}, ${prettyPrintNotes(selectedNoteTypes)}`
      }
    }
  };

  useEffect(() => {
    const currentPost = simplifiedPosts.find(
      (post) => post.slug === location.pathname
    )

    if (currentPost?.noteType) {
      const noteType = currentPost.noteType.reduce(
        (acc, val) => ({ ...acc, [val]: true }),
        {}
      )

      setDropdownOpen((prev) => ({
        ...prev,
        ...noteType,
      }))
    }
  }, [simplifiedPosts, location])

  return (
    <aside className="sidebar">
      <div className="title">
        <Filter className="filter" label={filterLabel(selectedNoteTypes, selectedCourse)} onApply={() => alert(selectedNoteTypes)}>
          <div className="filter-overview">
            <div>
              <h4>Course</h4>
              <ul className="filter-overview-course">
                {courses.map((course, index) => {
                  const isSelected = selectedCourse === course;
                  return (
                    <li>
                      <label key={index} className="filter-item">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectCourse(course)}
                        />
                        <span>
                          {course}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h4>Note Type</h4>
              <ul className="filter-overview-noteType">
                {noteTypes.map((noteType, index) => {
                  const isSelected = selectedNoteTypes.includes(noteType);
                  return (
                    <li>
                      <label key={index} className="filter-item">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectNoteTypes(noteType)}
                        />
                        <span>
                          {noteType}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Filter>
        <div className="filter-icon"></div>
      </div>

      <div className="noteType">
        <nav>
          {simplifiedPosts
            .filter((post) => {
              var sharesElement = false;
              for (var i = 0; i < post.noteType.length; i++) {
                for (var k = 0; k < selectedNoteTypes.length; k++) {
                  if (post.noteType[i] === selectedNoteTypes[k]) {
                    sharesElement = true;
                  }
                }
              }

              if (selectedNoteTypes.length !== 0 && selectedCourse) {
                return sharesElement && (post.course || []).includes(selectedCourse);
              } else if (selectedNoteTypes.length !== 0) {
                return sharesElement;
              } else if (selectedCourse) {
                return (post.course || []).includes(selectedCourse);
              }
              else {
                return true;
              }
            })
            .map((post) => {
              return (
                <Link
                  key={post.title}
                  to={post.slug}
                  activeClassName="active"
                >
                  <File />
                  <span>{post.title}</span>
                </Link>
              )
            })}
        </nav>
      </div>
    </aside>
  )
}
