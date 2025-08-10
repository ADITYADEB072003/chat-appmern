import React, { useContext, useState, useEffect } from 'react';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
//import RightSidebar from '../../components/RightSidebar/RightSidebar';
//import { AppContext } from '../../context/appContext';
import './Chat.css';

const Chat = () => {
    

    return (
        <div className="chat">
           
               
                <div className="chat-container">
                    <LeftSidebar />
               <ChatBox/>
                </div>
            )
        </div>
    );
};

export default Chat;
