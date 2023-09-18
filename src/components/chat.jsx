import React from 'react'
import '../css/chat.css'
import Cam from '../image/cam.png'
import Add from '../image/add.png'
import More from '../image/more.png'
import Messages from './messages'
import Input from './input'


const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Deepak</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat