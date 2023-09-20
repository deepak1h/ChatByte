import React from 'react'
import Profile from '../image/Profile.png'
import '../css/navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo1'>ChatByte</span>
      <div className='user'>
        <img src={Profile} alt="" />
        <span className='usernav'>Deepak</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar 