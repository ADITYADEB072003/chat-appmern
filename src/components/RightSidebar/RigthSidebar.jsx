// src/components/rightsidebar/rightsidebar.jsx

import React from 'react'; // Only React is needed for a basic static component
import './RightSidebar.css'; // Link CSS file for styling (fixed filename case)
import assets from '../../assets/assets'; // Import local assets (images, icons) - added semicolon
import { logout } from '../../config/firebase';

function RightSidebar() {
  return (
    <div className="RS"> {/* Main div for right sidebar */}
      <div className="RS_profile"> {/* Profile section for the selected user */}
        <img
          src={assets.profile_img} // Static placeholder for user's avatar
          alt="User Avatar"
        />
        <h3>
          {/* Static green dot to indicate online status visually */}
          <img src={assets.green_dot} className="dot" alt="Online Status" />
          Static User Name {/* Static placeholder for user's name */}
        </h3>
        <p>This is a placeholder bio for the user's profile. It provides a brief description.</p> {/* Static placeholder for user's bio */}
      </div>

      <hr /> {/* Horizontal line to separate sections */}

      <div className="RS_media"> {/* Media section for shared images */}
        <p>Media</p> {/* Label for the media gallery */}
        <div>
          {/* Static images to represent the media gallery, as described in source */}
          <img src={assets.pic1} alt="Shared Image 1" />
          <img src={assets.pic2} alt="Shared Image 2" />
          <img src={assets.pic3} alt="Shared Image 3" />
          <img src={assets.pic4} alt="Shared Image 4" />
          
          <img src={assets.pic2} alt="Shared Image 6" />
        </div>
      </div>

      <button onClick={()=>{
        logout()
      }}>Log Out</button> {/* Logout button. Functionality is removed in this static version. */}
    </div>
  );
}

export default RightSidebar;
