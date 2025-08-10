import React from 'react';
// import { AppContext } from '../../context/appContext';
// import { logout } from '../../config/firebase';
// import { useNavigate } from 'react-router-dom';
import './LeftSidebar.css';
import assets from '../../assets/assets';
// import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
// import { DB } from '../../config/firebase';

const LeftSidebar = () => {
    // Context and state management commented out
    // const { 
    //     chatData, 
    //     userData, 
    //     setChatUser, 
    //     setMessagesID, 
    //     chatVisual, 
    //     setChatVisual,
    //     messagesID 
    // } = useContext(AppContext);
    
    // const [user, setUser] = useState(null);
    // const [soSearch, setSoSearch] = useState(false);
    // const [userExist, setUserExist] = useState(false);
    
    // const navigate = useNavigate();

    // All functions commented out
    // const inputHandler = async (e) => {
    //     // Search functionality commented out
    // };

    // const addChat = async () => {
    //     // Add chat functionality commented out
    // };

    // const setChat = async (item) => {
    //     // Set chat functionality commented out
    // };

    // Sample data for UI display
    const sampleChats = [
        { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", avatar: "https://via.placeholder.com/35" },
        { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", avatar: "https://via.placeholder.com/35" },
        { id: 3, name: "Mike Johnson", lastMessage: "Thanks for the help", avatar: "https://via.placeholder.com/35" },
        { id: 4, name: "Sarah Wilson", lastMessage: "Good morning!", avatar: "https://via.placeholder.com/35" },
        { id: 5, name: "David Brown", lastMessage: "Let's meet up", avatar: "https://via.placeholder.com/35" },
        { id: 6, name: "Emma Davis", lastMessage: "How's the project?", avatar: "https://via.placeholder.com/35" },
    ];

    return (
        <div className="ls">
            {/* Top section containing logo and menu icon */}
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} alt="" className="logo" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                        <div className="submenu">
                            <p>Edit Profile</p>
                            <hr />
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>

                <div className="ls-search">
                    <img src={assets.search_icon} alt="" />
                    <input
                        type="text"
                        placeholder="Search here"
                        // onChange={inputHandler} - commented out
                    />
                </div>
            </div>

            {/* Main area for friend list */}
            <div className="ls-list">
                {/* Static sample data instead of dynamic chatData */}
                {sampleChats.map((item, index) => (
                    <div
                        key={index}
                        className="friends"
                        // onClick={() => setChat(item)} - commented out
                    >
                        <img src={assets.profile_img} alt="" />
                        <div>
                            <p>{item.name}</p>
                            <span>{item.lastMessage}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;
