import React from 'react'

const LoginForm = props => {
    return (
      <form onSubmit={props.handleSubmit}>
      <div>
          Username:<input value={props.username} onChange={props.handleUsernameChange} />
      </div>
      <div>
          Password:<input value={props.password} onChange={props.handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

export default LoginForm