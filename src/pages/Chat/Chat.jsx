//import React, { useContext, useEffect, useState } from 'react'
import React, { useContext, useState, useEffect } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSidebar from '../../components/RightSidebar/RigthSidebar';
import './Chat.css'

import { AppContext } from '../../context/Appcontext'


const Chat = () => {

  const { chatData,userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData,userData])

  return (
    <div className='chat'>
      {loading
        ?<p className='loading'>
          Loading...
        </p>
        : <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSidebar />
        </div>
      }

    </div>
  )
}

export default Chat
