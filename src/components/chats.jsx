import React from 'react'
import Profile from '../image/profile.png'

const Chats = () => {
  return (
    <div className='chats'>
      <div className='userChat'>
        <img src={Profile}></img>
        <div className='userChatInfo'>

          <span >Deepak</span>
          <p>latest message</p>

        </div>
      </div>
      <div className='userChat'>
        <img src={Profile}></img>
        <div className='userChatInfo'>

          <span >Deepak</span>
          <p>latest message</p>

        </div>
      </div>
      <div className='userChat'>
        <img src={Profile}></img>
        <div className='userChatInfo'>

          <span >Deepak</span>
          <p>latest message</p>

        </div>
      </div>
      <div className='userChat'>
        <img src={Profile}></img>
        <div className='userChatInfo'>

          <span >Deepak</span>
          <p>latest message</p>

        </div>
      </div>
    </div>



  )
}

export default Chats