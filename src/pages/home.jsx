import React from 'react'
import Sidebar from '../components/sidebar'
import Chat from '../components/chat'
import "./home.css"

const Home = () => {
    return (
        <div className='home'>
          <div className="container">
            <Sidebar/>
            <Chat/>
          </div>
        </div>
      )
}

export default Home