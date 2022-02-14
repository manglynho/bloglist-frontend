import React, {useState} from 'react'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {    
    setUsername(event.target.value)  
  }
  const handlePasswordChange = (event) => {    
    setPassword(event.target.value)  
  }

  const handleLogin = async (event) => {
    event.preventDefault()    
    doLogin({
      username: username,
      password: password,
    })
    setUsername('')
    setPassword('')
  }
    return (
      <form onSubmit={handleLogin}>
      <div>
          Username:<input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
          Password:<input value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

export default LoginForm