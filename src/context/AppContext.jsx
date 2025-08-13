// context/appContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();

  // State variables
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState([]); // default to array
  const [messagesID, setMessagesID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  /**
   * Load user data from Firestore
   */
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        // also store UID with user data
        setUserData({ ...data, id: uid });

        // Update "last seen" immediately
        await updateDoc(userRef, { lastSeen: Date.now() });
      } else {
        console.error("No user found for UID:", uid);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  /**
   * Navigate based on profile completeness when userData changes
   */
  useEffect(() => {
    if (!userData) return;
  
    const { pathname } = location;
  
    // Missing profile info → force profile page
    if (!userData.avatar || !userData.name) {
      if (pathname !== "/profile") {
        navigate("/profile");
      }
      return;
    }
  
    // If profile complete and currently on landing page, go to chat
    if (pathname === "/" || pathname === "/login") {
      navigate("/chat");
    }
  }, [userData, navigate, location]);

  /**
   * Keep "lastSeen" updated every minute while chatting
   */
  useEffect(() => {
    let interval;
    if (userData?.id && chatUser) {
      const userRef = doc(db, "users", userData.id);
      interval = setInterval(async () => {
        await updateDoc(userRef, { lastSeen: Date.now() });
      }, 60_000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [userData?.id, chatUser]);

  /**
   * Real-time listener for the user's chat list
   */
  useEffect(() => {
    if (!userData?.id) return;

    const chatRef = doc(db, "chats", userData.id);
    const unsub = onSnapshot(chatRef, async (snapshot) => {
      if (!snapshot.exists()) {
        setChatData([]);
        return;
      }

      const chatItems = snapshot.data().chatsData || [];

      const enrichedChats = await Promise.all(
        chatItems.map(async (item) => {
          const receiverSnap = await getDoc(doc(db, "users", item.rId));
          const receiverData = receiverSnap.exists()
            ? receiverSnap.data()
            : {};
          return { ...item, userData: receiverData };
        })
      );

      // Sort by most recent update
      setChatData(enrichedChats.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unsub();
  }, [userData?.id]);

  /**
   * Value provided to the context consumers
   */
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    messagesID,
    setMessagesID,
    messages,
    setMessages,
    
    chatUser,
    setChatUser,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
