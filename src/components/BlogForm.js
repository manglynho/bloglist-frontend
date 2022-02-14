import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTittle, setNewBlogTittle] = useState('blog tittle...')
  const [newBlogAuthor, setNewBlogAuthor] = useState('blog author...')
  const [newBlogUrl , setNewBlogUrl] = useState('blog url...')

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
          Blog:<input value={newBlogTittle} onChange={handleBlogTittleChange} />
      </div>
      <div>
          Author:<input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
        </div>
        <div>
          Url:<input value={newBlogUrl} onChange={handleBlogUrlChange} />
        </div>
          <button type="submit">save</button>
      </form>
    )
  }

export default BlogForm