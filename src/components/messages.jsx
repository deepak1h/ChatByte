import React, { useContext, useEffect, useState } from 'react'
import Message from './message'
import '../css/messages.css'
import { ChatContext } from '../context/chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
const Messages = () => {

  const [messages, setMessage] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessage(doc.data().messages);
    });

    // return () => {
    //   unsubscribe();
    // }
   
    
  }, [data.chatId]);

  return (
    <div className='messages'>
        {messages.map((m)=>(
          <Message message={m} key={m.id}/>
        ))}
        
    </div>
  )
}

export default Messages