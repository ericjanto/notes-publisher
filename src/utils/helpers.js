export function getSimplifiedPosts(posts) {
    return posts.map((post) => ({
      id: post.node.id,
      slug: post.node.fields.slug,
      course: post.node.frontmatter.course,
      noteType: post.node.frontmatter.noteType,
      title: post.node.frontmatter.title,
    }))
  }
  
  export function getNoteTypeFromPosts(posts) {
    return posts
      .reduce((acc, post) => {
        return [...new Set([...acc, ...(post.noteType || [])])]
      }, [])
      .sort()
  }
  
  export function getCourseFromPosts(posts) {
    return posts
      .reduce((acc, post) => {
        return [...new Set([...acc, ...(post.course || [])])]
      }, [])
      .sort()
  }
  
  export function prettyPrintNotes(noteTypes) {
    var printString = "";
  
    if (!noteTypes || noteTypes.length === 0) {
      return ""
    } else {
      noteTypes.sort();
      for (var i = 0; i < noteTypes.length; i++) {
        if (i === noteTypes.length - 1) {
          printString += " " + noteTypes[i][0];
        } else {
          printString += " " + noteTypes[i][0] + ",";
        }
      }
    }
  
    return printString;
  }
  
  export function slugify(string) {
    return (
      string &&
      string
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join('-')
    )
  }
  