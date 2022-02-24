import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import reactDom from 'react-dom'

const Blog = ({ blog, plusLike, byeBlog }) => {
  const [advPanelVisible, setAdvPanelVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle ={
    color: 'white',
    backgroundColor: 'red',
    borderColor:'red',
    borderRadius: '10%'
  }

  const hideWhenVisible = { display: advPanelVisible ? 'none' : '' }
  const showWhenVisible = { display: advPanelVisible ? '' : 'none' }


  const advancedBlogPanelButtons = () => {
    return (
      <span>
        <span style={hideWhenVisible}>
          <button onClick={() => setAdvPanelVisible(true)}>View</button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={() => setAdvPanelVisible(false)}>Hide</button>
        </span>
      </span>
    )
  }

  const advancedBlogPanel = () => {
    return (
      <div>
        <div style={showWhenVisible} className='moreDataPanel'>
          <div>
            {blog.url}
          </div>
          <div>
            Likes:<span className='likesValue'>{blog.likes}</span>
            <button className='likeBtn' onClick={plusLike}>Like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <button className='removeBtn' style={removeBtnStyle} onClick={byeBlog}>Remove</button>
        </div>
      </div>
    )
  }

  return (
    <div className='blog_element' style={blogStyle}>
      <div>
        {blog.title} {blog.author} {advancedBlogPanelButtons()}
        {advancedBlogPanel()}
      </div>
    </div>
  )}

Blog.propTypes = {
  plusLike: PropTypes.func.isRequired,
  byeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog