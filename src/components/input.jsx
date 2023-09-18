import React from 'react'
import '../css/input.css'
import Upload from '../image/upload.png'
import Attach from '../image/attach.png'
const Input = () => {
  return (
    <div className='input'>
        <input type="text" placeholder='type...'/> 
        <div className="send">
          <img src={Upload} alt="" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Attach} alt="" />
          </label>
          <button >Send</button>
        </div>
    </div>
  )
}

export default Input