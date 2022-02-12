import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTittle, setNewBlogTittle] = useState('blog tittle...')
  const [newBlogAuthor, setNewBlogAuthor] = useState('blog author...')
  const [newBlogUrl , setNewBlogUrl] = useState('blog url...')
  const [notif, setNotif] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

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

  const addBlog = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: newBlogTittle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    try { 
    const returnedBlog = await blogService
      .create(blogObject)

      setBlogs(blogs.concat(returnedBlog))        
      setNewBlogTittle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      triggerNotif(`A new blog ${newBlogTittle} by ${newBlogAuthor} added`, 'success')
      
    }catch(exception){
      triggerNotif('Form Error', 'error')
    } 
  }

  const handleBlogTittleChange = (event) => {    
    setNewBlogTittle(event.target.value)  
  }
  const handleBlogAuthorChange = (event) => {    
    setNewBlogAuthor(event.target.value)  
  }
  const handleBlogUrlChange = (event) => {    
    setNewBlogUrl(event.target.value)  
  }
  const handleUsernameChange = (event) => {    
    setUsername(event.target.value)  
  }
  const handlePasswordChange = (event) => {    
    setPassword(event.target.value)  
  }
  
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    triggerNotif('User logged out', 'success')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()    
    try {     
       const user = await loginService.login({
        username, password,      
      }) 
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)     
      setUser(user)
      setUsername('')      
      setPassword('')    
    } catch (exception) { 
      triggerNotif('Wrong credentials', 'error')         
    }  
  }

  return (
    <div>
        <h2>Blogs App</h2>
        <Notification notif={notif}/>
        {user === null ?
          <div>
          <h2>Log in to application</h2>
          <LoginForm 
            username={username} 
            password={password} 
            handleUsernameChange={handleUsernameChange} 
            handlePasswordChange={handlePasswordChange} 
            handleSubmit={handleLogin}
          />
          </div> :
          <div>
            <p>{user.name} logged in 
            <button onClick={() => logout()}>
            Logout      
            </button></p>
            <h3>Add a new</h3>
            <BlogForm 
              newBlogTittle={newBlogTittle} 
              newBlogAuthor={newBlogAuthor} 
              newBlogUrl={newBlogUrl} 
              handleBlogTittleChange={handleBlogTittleChange} 
              handleBlogAuthorChange={handleBlogAuthorChange} 
              handleBlogUrlChange={handleBlogUrlChange} 
              handleSubmit={addBlog}
            />
            <hr/>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
    </div>
  )
}

export default App
