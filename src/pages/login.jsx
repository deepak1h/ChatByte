import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [error,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event)=>{
    
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    console.log(email)
    
    try{
    setErr(false);
    await signInWithEmailAndPassword(auth, email, password)
    navigate('/');
  }
  catch(error){
        setErr(true)
        const errorCode = error.code;
        const errorMessage = error.message;
        
        const errorElement = document.getElementById('error');
        console.log(errorElement);
        if (1) {
            errorElement.innerText = "lol";
            console.log("baby")
        }
        console.error(errorMessage,errorCode)  
  }
}

  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">ChatByte</span>
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
        <button>Sign in</button>
        {error && <span id="error" className="errorMessage"></span>}
      </form>
      <p>
        You don't have an account? Signup
      </p>
    </div>
  </div>
  )
}

export default Login