import React, { useContext } from 'react'
import '../css/navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {AuthContext} from "../context/authContext"

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo1'>ChatByte</span>
      <div className='user'>
        <img src={currentUser?.photoURL} alt="" />
        <span className='usernav'>{currentUser?.displayName}</span>
        <button onClick={()=>signOut(auth)}> logout </button>
      </div>
    </div>
  )
}

export default Navbar 