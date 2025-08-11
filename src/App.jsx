import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
 import { ToastContainer, toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
const App = () => {
const navigator=useNavigate();
  useEffect(()=>{
      onAuthStateChanged(auth,async(user)=>{
        if (user){
 navigator('/chat')
        }
        else{
          navigator('/')
        }
      })

    },[])
  return (
    
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Chat' element={<Chat/>}/>
        <Route path='/profile' element={<ProfileUpdate/>}/>
      </Routes>
    </>
  )
}

export default App
