import React from 'react'
import assets from '../../assets/assets'

import './Chatbox.css';
const Chatbox = () => {
  return (
<div className="chat-box">
    <div className="chat-user">
        <img src={assets.profile_img} alt=""/>
        <p> Richard Sanford <img src={assets.green_dot} alt="" className="src" /></p>
        <img src={assets.help_icon} alt="" className="help" />
    </div>
    <div className="chat-msg">
        <div className="s-msg">
            <p className="msg">Lorem</p>
            <div>
                <img src={assets.profile_img} alt="" className="" />
                <p>2:30</p>
            </div>

        </div>
          <div className="s-msg">
           <img className="msg-image" src={assets.pic1} alt=""  />
            <div>
                <img src={assets.profile_img} alt="" className="" />
                <p>2:30</p>
            </div>

        </div>
          <div className="r-msg">
            <p className="msg">Lorem</p>
            <div>
                <img src={assets.profile_img} alt="" className="" />
                <p>2:30</p>
            </div>

        </div>
    </div>
    <div className="chat-input">
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