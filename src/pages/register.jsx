import React, { useState } from 'react'
import Photo from "../image/upload.png"
import Logo from "../image/icon.png"
import "../css/style.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setErr] = useState(false);
  const [success, setSuc] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //get all element from the form
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const photo = event.target[3].files[0];

    try {

      //set sucess and error true just to render check
      setSuc(true)
      setErr(true)

      //create user by Firebase function
      const result = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, 'profile/' + result.user.uid + ".jpg");
      const uploadTask = uploadBytesResumable(storageRef, photo);
      //upload photo 
      uploadTask.on(

        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        //if any error encounter
        (error) => {
          setErr(true)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);

            //update profile on irebase its firebase function
            await updateProfile(result.user, {
              displayName: name,
              photoURL: downloadURL
            })

            //create users table in firebase and store user id name photo email
            await setDoc(doc(db, "users", result.user.uid), {
              uid: result.user.uid,
              name,
              email,
              photoURL: downloadURL,
            });
            //create userchats in db as key as uid
            await setDoc(doc(db, "userChats", result.user.uid), {});
          });
        }
      );
      // if created then set error as false 
      setErr(false)
      //render accordingly
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.innerText = "you are registerd";
      }
      console.log("success")

    }
    catch (error) {
      setErr(true)
      setSuc(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.innerText = errorCode;
      }
      console.error(errorMessage, errorCode)
    }

  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className='icon'>
          <img src={Logo} alt="" />
          <span className="logo">ChatByte</span>
        </div>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Photo} alt="" />
            <span>upload profile photo</span>
          </label>
          <button>Sign up</button>
          {error && <span id="error-message" className="errorMessage"></span>}
          {success && <span id="success-message" className="successMessage"></span>}
        </form>
        <p>
          You do have an account?  <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register