import React, { useContext, useState } from 'react'
import '../css/input.css'
import Upload from '../image/upload.png'
import Attach from '../image/attach.png'
import { ChatContext } from '../context/chatContext'
import { AuthContext } from '../context/authContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const Input = () => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setfile] = useState(null);
  
  const storageRef = ref(storage, 'data/' + uuid());

  const handlekey = (event)=>{
    (event.code === 'Enter' || event.keyCode===13) && handleSend()
  }

  const handleSend = async ()=>{
    
    if(file){
        
    }
    else if(img){
            //upload photo 
            // console.log("image found")
            // console.log(img)
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(

              'state_changed',
              (snapshot) => {
                // console.log("image uploaded1", img)
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              //if any error encounter
              (error) => {
                setErr(true)
              },
              () => {
                
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask?.snapshot?.ref).then(async (downloadURL) => {
                  // console.log("image uploaded 3", img)
                  // console.log('File available at', downloadURL);

                  // console.log(text, currentUser.uid, Timestamp.now(), downloadURL)

                  await updateDoc(doc(db,"chats", data?.chatId),{
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser?.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });

                });


              }
            );

    }
    else if(text){
      //console.log(data.chatId)
      await updateDoc(doc(db,"chats", data?.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

     await updateDoc(doc(db, "userChats", currentUser?.uid),{
      [data?.chatId+".lastMessage"]:{
        text,
      },
      [data?.chatId+".date"]: serverTimestamp(),
    })

      await updateDoc(doc(db, "userChats", data?.user?.uid),{
      [data?.chatId+".lastMessage"]:{
        text,
      },
      [data?.chatId+".date"]: serverTimestamp(),
    })
    setImg(null);
    setText("");
  }


  return (
    <div className='input'>
        <input onKeyDown={handlekey} type="text" placeholder='type...' 
        onChange={event=>setText(event?.target?.value)}
        value={text}
        /> 
        <div onKeyDown={handlekey} className="send">
          <img src={Attach} alt=""  />
          <input style={{ display: "none" }} type="file" id="file" onChange={event=>setImg(event?.target?.files[0])} />
          <label htmlFor="file">
            <img src={Upload} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input