import React, { useContext } from 'react'
import '../css/chat.css'
import Cam from '../image/cam.png'
import Add from '../image/add.png'
import More from '../image/more.png'
import Messages from './messages'
import Input from './input'
import { ChatContext } from '../context/chatContext'
import Default from './default'


const Chat = () => {
const {data} = useContext(ChatContext)

  return (
    <div className='chat'>

      {data.chatId != "null" &&<div className="chatInfo">
        <div className='userInfo'>
          {data && <img src={data?.user?.photoURL}></img>}
          <span>{data.user?.name}</span>
        </div>
        <div className="chatIcons">
          <img className='cam' src={Cam} alt="" />
          <img className='add' src={Add} alt="" />
          <img className='more' src={More} alt="" />
        </div>
      </div>}
      {data.chatId != "null" && <Messages/>}
      {data.chatId != "null" && <Input/>}
      {data.chatId == "null" && <Default/>}
    </div>
  )
}

export default Chat