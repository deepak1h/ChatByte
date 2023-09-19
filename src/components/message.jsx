import React from 'react'
import Profile from '../image/profile.png'
import test from '../image/test.png'
import '../css/message.css'

const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src={Profile} alt="" />
        <span>date</span>
      </div>
      <div className="messageData">
        <img src={test} alt="" />
        <p>I am Optimus Prime, and I send this message to any surviving Autobots taking refuge among the stars: We are here. We are waiting.</p>
      </div>
    </div>
  )
}

export default Message