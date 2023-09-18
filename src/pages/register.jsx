import React from 'react'
import Photo from "../image/upload.png"
import "../css/style.css"

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatByte</span>
        <span className="title">Register</span>
        <form>
          <input required type="text" placeholder="name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Photo} alt="" />
            <span>upload profile photo</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>
          You do have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register