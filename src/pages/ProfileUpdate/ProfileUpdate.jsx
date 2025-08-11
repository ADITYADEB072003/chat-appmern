import React from 'react'
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { useState } from 'react';
const ProfileUpdate = () => {
  const [image,setimage]=useState(false);
  return(
   <div className="profile">
    <div className="profile-container">
      <form >
        <h3> Profile Detail</h3>
        <label htmlFor="avatar">
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" name="" id="avatar" accept=".png,.jpg,.jpeg" hidden />
          <img src={image?URL.createObjectURL(image):assets.avatar_icon} alt="" className="src" />
          Upload Profile Image
        </label>
        <input type="text" placeholder='Your Name' />
        <textarea placeholder='Write Profile Bio' required></textarea>
        <button type="submit">Save</button>

      </form>
      <img src={image?URL.createObjectURL(image):assets.logo_icon} alt="" className="profile-pic" />
    </div>
   </div>
  )
}

export default ProfileUpdate