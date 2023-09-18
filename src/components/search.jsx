import React from 'react'
import '../css/search.css'
import Profile from '../image/Profile.png'

const Search = () => {
  return (
    <div className='search'>
      <div className='searchForm'> 
        <input type="text" placeholder='find a user'/> 
      </div>
      <div className='userChat'>
        <img src={Profile}></img>
        <div className='userChatInfo'>
          <span>Deepak</span>
        </div>
      </div>
    </div>

  )
}

export default Search