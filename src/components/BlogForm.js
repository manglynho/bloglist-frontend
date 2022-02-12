import React from 'react'

const BlogForm = props => {
    return (
      <form onSubmit={props.handleSubmit}>
      <div>
          Blog:<input value={props.newBlogTittle} onChange={props.handleBlogTittleChange} />
      </div>
      <div>
          Author:<input value={props.newBlogAuthor} onChange={props.handleBlogAuthorChange} />
        </div>
        <div>
          Url:<input value={props.newBlogUrl} onChange={props.handleBlogUrlChange} />
        </div>
          <button type="submit">save</button>
      </form>
    )
  }

export default BlogForm