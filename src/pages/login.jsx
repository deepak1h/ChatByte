import React from 'react'

const Login = () => {
  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">ChatByte</span>
      <span className="title">Register</span>
      <form>
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />

        <button>Sign up</button>
      </form>
      <p>
        You don't have an account? Signup
      </p>
    </div>
  </div>
  )
}

export default Login