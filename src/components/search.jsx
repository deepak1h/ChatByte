import React, { useContext, useState } from 'react'
import '../css/search.css'
import {collection, getDocs,getDoc, query, serverTimestamp, setDoc, where, updateDoc, doc} from 'firebase/firestore'
import {db} from "../firebase"
import { AuthContext } from '../context/authContext'
import { ChatContext } from '../context/chatContext'


const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  const handlesearch = async ()=>{
    const q = query(collection(db,"users"),where("email","==",username));
    try{
      const querySnapshot = await getDocs(q);
      
      
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
      })
      setErr(querySnapshot.empty)
      if(querySnapshot.empty){
        setUser(null)
      }
    }
    catch(err){
      setErr(true);
    } 
  }

  const handlekey = (event)=>{
    event.code === 'Enter' && handlesearch()
  }

  const handleSelect = async (userinfo) => {
    // console.log("started")

    dispatch({type: "CHANGE_USER", payload: userinfo})

    const combinedId = currentUser?.uid > user?.uid ? currentUser?.uid+user?.uid : user?.uid+currentUser?.uid;
    //console.log(combinedId)
    try{
      const result = await getDoc(doc(db, "chats", combinedId))
      //console.log(result)
      if(!result.exists()){
        console.log("not exist creating")
        await setDoc(doc(db,"chats",combinedId), {messages: []})
      }
      //console.log(user,"creating userchats")
        //create userChats
        /* 
        userChats: 
          currentUser:
            combinedID:
              userInfo{
                name, photo, uid
              },
              lastmessage:"",
              date: date
        */
      await updateDoc(doc(db,"userChats", currentUser?.uid), {
        [combinedId+".userInfo"]: {
          uid:user?.uid,
          photoURL: user?.photoURL,
          name: user?.name
        },
        [combinedId+".date"]: serverTimestamp()
      });


      //console.log(currentUser,"creating other userchats")
      await updateDoc(doc(db,"userChats", user?.uid), {
        [combinedId+".userInfo"]: {
          uid:currentUser?.uid,
          photoURL: currentUser?.photoURL,
          name: currentUser?.displayName
        },
        [combinedId+".date"]: serverTimestamp()
      });


      //console.log("created")
      }
      
    catch(err){
      console.log(err)
    }
    setUser(null);
    setUsername("");
  }

  return (
    <div className='search'>
      <div className='searchForm'> 
        <input type="text" placeholder='find a user' 
        onKeyDown={handlekey} 
        onChange={event=>setUsername(event.target?.value)}
        value={username}/> 
      </div>
      {err && <span>user not found</span>}
      {user && <div onClick={ () => handleSelect({uid:user?.uid, photoURL: user?.photoURL,name: user?.name}) } className='userChat'>
        <img src={ user?.photoURL }></img>
        <div  className='userChatInfo'>
          <span>{user?.name}</span>
        </div>
      </div>}
    </div>

  )
}

export default Search