import React, { useContext, useState, useEffect } from 'react';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RigthSidebar from '../../components/RightSidebar/RigthSidebar';
//import { AppContext } from '../../context/appContext';
import './Chat.css';
import { AppContext } from '../../context/appContext';

const Chat = () => {
const {chatData,userData}=useContext(AppContext)
const [loading,setloading]=useState(true)
useEffect(()=>{
    if (chatData &&userData){
        setloading(false);
    }
},[chatData,userData])
    return (
        <div className="chat">
{
    loading?<p className='loading'>Loading..</p>:
    <div className="chat-container">
    <LeftSidebar />
    <ChatBox />
    <RigthSidebar />
</div>
}

           
            
        </div>
    );
};

export default Chat;
