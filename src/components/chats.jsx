import React, { useContext, useEffect, useState } from 'react'
import Profile from '../image/profile.png'
import '../css/chats.css'
import {AuthContext} from "../context/authContext"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { ChatContext } from '../context/chatContext'

const Chats = () => {

  const [chats, setChats] = useState({})

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(()=> {
    
    const getChats = () => {

      const unsubscribe = onSnapshot(doc(db,"userChats", currentUser.uid), (doc)=>{
      setChats(doc.data())
      console.log("doc", doc)
    })

    return () => {
      unsubscribe();
    };
  };

    currentUser.uid && getChats()

  },[currentUser.uid]) 

  console.log("chats: ",chats)

  const handleSelect = (userinfo) => {
    console.log("selected")
    console.log(userinfo)
    dispatch({type: "CHANGE_USER", payload: userinfo})
  }

  return (

    <div className='chats'>  
      {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(([chatId, chatData]) =>(
        <div className='userChat' key={chatId} onClick={ () => handleSelect(chatData.userInfo)}>
          <img src={chatData.userInfo.photoURL}></img>
          <div className='userChatInfo'>
            <span >{chatData.userInfo.name}</span>
            <p>{chatData.lastMessage?.text}</p>
          </div>
        </div>
      ))}  
    </div>
  )
}

export default Chats