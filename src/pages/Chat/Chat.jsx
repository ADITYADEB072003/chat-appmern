import React, { useContext, useState, useEffect } from 'react';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RigthSidebar from '../../components/RightSidebar/RigthSidebar';
//import { AppContext } from '../../context/appContext';
import './Chat.css';

const Chat = () => {


    return (
        <div className="chat">


            <div className="chat-container">
                <LeftSidebar />
                <ChatBox />
                <RigthSidebar />
            </div>
            )
        </div>
    );
};

export default Chat;
