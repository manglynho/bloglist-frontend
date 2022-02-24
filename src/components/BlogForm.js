import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTittle, setNewBlogTittle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl , setNewBlogUrl] = useState('')

  const handleBlogTittleChange = (event) => {
    setNewBlogTittle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTittle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTittle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          Blog:<input id='title' value={newBlogTittle} onChange={handleBlogTittleChange} />
      </div>
      <div>
          Author:<input id='author' value={newBlogAuthor} onChange={handleBlogAuthorChange} />
      </div>
      <div>
          Url:<input id='url' value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <button id='add-blog-button' type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog:PropTypes.func.isRequired
  /*addBlog: PropTypes.func.isRequired,
  handleBlogTittleChange: PropTypes.func.isRequired,
  handleBlogAuthorChange: PropTypes.func.isRequired,
  handleBlogUrlChange:PropTypes.func.isRequired,
  newBlogTittle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired*/
}

export default BlogForm