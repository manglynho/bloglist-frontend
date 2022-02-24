import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
          Username:<input id='username' value={username} onChange={handleUsernameChange} />
      </div>
      <div>
          Password:<input id='password' value={password} onChange={handlePasswordChange} />
      </div>
      <button id='login-button' type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  doLogin:PropTypes.func.isRequired,
  /*handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired*/
}

export default LoginForm