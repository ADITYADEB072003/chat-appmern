import React from 'react'
import assets from '../../assets/assets'

import './Chatbox.css';
const Chatbox = () => {
  return (
<div className="chat-box">
    <div className="chat-user">
        <img src={assets.profile_img} alt=""/>
        <p> Richard Sanford <img src={assets.green_dot} alt="" className="src" /></p>
        <img src={assets.help_icon} alt="" className="src" />
    </div>
    <div className="chat_input">
        <input type="text" placeholder='Send a Message' className="text" />
        <input type="file"  id ='image' accept ='image/png,image/jpg'className="type file" />
        <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="src" />

        </label>
        <img src={assets.send_button}/>
    </div>
</div>    
)
}

export default Chatbox