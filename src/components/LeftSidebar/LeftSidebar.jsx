import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import { logout, db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  //
} from 'firebase/firestore';
import assets from '../../assets/assets';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const navigate = useNavigate();

  const {
    chatData,
    userData,
    setChatUser,
    setMessagesID,
    //chatVisual,
    setChatVisual,
    messagesID
  } = useContext(AppContext);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userExist, setUserExist] = useState(false);
//   const [messageID, setmessageid] = useState(null);
//   const [msg, setMessages] = useState([]);
//   const [chatUser, setChatUser] = useState(null)
  /**
   * Search for other users
   */
  const inputHandler = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const q = query(
        collection(db, 'users'),
        where('name', '>=', value),
        where('name', '<=', value + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const usersFound = [];
      querySnapshot.forEach(docSnap => {
        if (docSnap.id !== userData.id) {
          usersFound.push({ id: docSnap.id, ...docSnap.data() });
        }
      });

      setSearchResults(usersFound);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  /**
   * Add a new chat with a user
   */
//   const addChat = async (otherUser) => {
//     try {
//       // Create a chat doc for the current user if not exists
//       const currentChatRef = doc(db, 'chats', userData.id);
//       let chatsData = chatData || [];

//       // Ensure we don't add duplicate chat
//       const exists = chatsData.some(chat => chat.rId === otherUser.id);
//       if (exists) {
//         setUserExist(true);
//         return;
//       }

//       const newChatItem = {
//         rId: otherUser.id,
//         lastMessage: '',
//         updatedAt: Date.now()
//       };
//       chatsData.push(newChatItem);

//       await updateDoc(currentChatRef, { chatsData });

//       // Also add chat item to the other user
//       const receiverChatRef = doc(db, 'chats', otherUser.id);
//       const receiverSnap = await getDocs(query(collection(db, 'chats'), where('__name__', '==', otherUser.id)));
//       let receiverChatsData = [];
//       if (!receiverSnap.empty) {
//         receiverSnap.forEach(doc => {
//           receiverChatsData = doc.data().chatsData || [];
//         });
//       }
//       receiverChatsData.push({
//         rId: userData.id,
//         lastMessage: '',
//         updatedAt: Date.now()
//       });
//       await updateDoc(receiverChatRef, { chatsData: receiverChatsData });

//       setUserExist(false);
//     } catch (error) {
//       console.error('Error adding chat:', error);
//     }
//   };
const addChat = async (otherUser) => {
    if (!userData?.id || !otherUser?.id) return;
  
    try {
      // 1️⃣ Generate a Firestore-generated ID for messages doc (no uuid needed)
      const messagesID = doc(collection(db, 'messages')).id;
  
      // 2️⃣ Create empty messages document
      await setDoc(doc(db, 'messages', messagesID), {
        messages: []
      });
  
      // Chat object for the current user
      const newChatItemForCurrentUser = {
        rId: otherUser.id,
        messagesID,
        lastMessage: '',
        updatedAt: Date.now(),
        messageSeen: true
      };
  
      // Chat object for the other user
      const newChatItemForOtherUser = {
        rId: userData.id,
        messagesID,
        lastMessage: '',
        updatedAt: Date.now(),
        messageSeen: true
      };
  
      // ---- Update current user chat list ----
      const currentChatRef = doc(db, 'chats', userData.id);
      let chatsData = [];
      const currentSnap = await getDoc(currentChatRef);
      if (currentSnap.exists()) {
        chatsData = currentSnap.data().chatsData || [];
      }
      if (!chatsData.some(chat => chat.rId === otherUser.id)) {
        chatsData.push(newChatItemForCurrentUser);
        await setDoc(currentChatRef, { chatsData }, { merge: true });
      }
  
      // ---- Update receiver user chat list ----
      const receiverChatRef = doc(db, 'chats', otherUser.id);
      let receiverChats = [];
      const receiverSnap = await getDoc(receiverChatRef);
      if (receiverSnap.exists()) {
        receiverChats = receiverSnap.data().chatsData || [];
      }
      if (!receiverChats.some(chat => chat.rId === userData.id)) {
        receiverChats.push(newChatItemForOtherUser);
        await setDoc(receiverChatRef, { chatsData: receiverChats }, { merge: true });
      }
  
      console.log('Chat created with messagesID:', messagesID);
      setUserExist(false);
  
    } catch (error) {
      console.error('Error adding chat:', error);
    }
  };
  /**
   * Open a chat from the list
   */
  const setChat = (item) => {
    setChatUser(item.userData);
    setMessagesID(item.messagesID);
   // setChatVisual(true);
  };

  return (
    <div className="ls">
      {/* Top section containing logo and menu */}
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="Logo" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="Menu" />
            <div className="submenu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p onClick={async () => {
                await logout();
                navigate('/login');
              }}>
                Log Out
              </p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="ls-search">
          <img src={assets.search_icon} alt="Search" />
          <input
            type="text"
            placeholder="Search here"
            value={searchText}
            onChange={inputHandler}
          />
        </div>
      </div>

      {/* Main chat list area */}
      <div className="ls-list">
        {/* If search is active, show search results */}
        {searchText && searchResults.length > 0 ? (
          searchResults.map(user => (
            <div
              key={user.id}
              className="friends"
              onClick={() => addChat(user)}
            >
              <img src={user.avatar || assets.profile_img} alt="" />
              <div>
                <p>{user.name}</p>
                <span>{user.email}</span>
              </div>
            </div>
          ))
        ) : (
          /* Otherwise, show chatData from context */
          chatData.length > 0 ? (
            chatData.map((item, index) => (
              <div
                key={index}
                className="friends"
                onClick={() => setChat(item)}
              >
                <img src={item.userData?.avatar || assets.profile_img} alt="" />
                <div>
                  <p>{item.userData?.name || 'Unknown User'}</p>
                  <span>{item.lastMessage || 'No messages yet'}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-chats">No chats yet</p>
          )
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
