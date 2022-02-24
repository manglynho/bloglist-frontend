import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const triggerNotif = ( message, style) => {
    const notif = {
      message: message,
      style: style,
    }
    setNotif(notif)
    setTimeout(() => {setNotif([])}, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService
        .create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      triggerNotif(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
    }catch(exception){
      triggerNotif('Form Error', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    triggerNotif('User logged out', 'success')
    setUser(null)
  }

  const handleLogin = async (loginData) => {
    loginFormRef.current.toggleVisibility()
    try {
      const user = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      triggerNotif('Wrong credentials', 'error')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' buttonCancelLabel='Cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel='Login' buttonCancelLabel='Cancel' ref={loginFormRef}>
      <LoginForm doLogin={handleLogin} />
    </Togglable>
  )

  const doLike = async (id) => {
    const blog = await blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes++ }
    changedBlog.likes = blog.likes++
    const returnedBlog = await blogService.update(changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Delete ${blogObject.title} ?`)) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(n => n.id !== blogObject.id))
        triggerNotif(`Removed ${blogObject.title}`, 'success')
      }catch (error) {
        if (error.response) {
          // Request made and server responded
          triggerNotif(error.response.data.error, 'error')
        }else{
          triggerNotif(error.message, 'error')
        }
      }
    }
  }

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification notif={notif}/>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <p>{user.name} logged in
            <button id="logout-btn" onClick={() => logout()}>
            Logout
            </button></p>
          <h3>Add a new</h3>
          {blogForm(addBlog)}
          <hr/>
          <div id='blogs-container'>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} plusLike={ () => doLike(blog.id)} byeBlog={() => removeBlog(blog) }  />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
