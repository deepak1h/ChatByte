import React, { useContext, useEffect, useState } from 'react'
import Profile from '../image/profile.png'
import '../css/chats.css'
import {AuthContext} from "../context/authContext"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Chats = () => {

  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)

  useEffect(()=> {
    
    const getChats = () => {

      const unsubscribe = onSnapshot(doc(db,"userChats", currentUser.uid), (doc)=>{
      setChats(doc.data())
    })

    return () => {
      unsubscribe();
    };
  };

    currentUser.uid && getChats()

  },[currentUser.uid]) 

  console.log(chats)

  return (

    <div className='chats'>  
      {Object.entries(chats)?.map(([chatID, chatData]) =>(
        <div className='userChat' key={chatID}>
          <img src={chatData.userInfo.photoURL}></img>
          <div className='userChatInfo'>
            <span >{chatData.userInfo.name}</span>
            <p>{chatData.userInfo.latestmessage}</p>
          </div>
        </div>
      ))}  
    </div>
  )
}

export default Chats