// pages/ProfileUpdate.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../../config/firebase';        // Firestore instance
import assets from '../../assets/assets';           // Static assets
import  upload  from '../../lib/upload'  ;      // Helper to upload image to storage
import { AppContext } from '../../context/appContext'; // Global state

import './ProfileUpdate.css';

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);       // New image file
  const [prevImage, setPrevImage] = useState(''); // Existing avatar URL from DB
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState(null);

  const { setUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const auth = getAuth();

  // Load user data on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.name) setName(userData.name);
          if (userData.bio) setBio(userData.bio);
          if (userData.avatar) setPrevImage(userData.avatar);
        }
      } else {
        navigate('/'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Handle profile update
  const profileUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!prevImage && !image) {
        toast.error('Please upload a profile picture');
        return;
      }

      const docRef = doc(db, 'users', uid);
      let imageURL = prevImage;

      if (image) {
        // Upload new image
        imageURL = await upload(image);
        setPrevImage(imageURL);
      }

      // Update Firestore doc
      await updateDoc(docRef, {
        avatar: imageURL,
        name,
        bio,
      });

      // Refresh global AppContext data
      const snap = await getDoc(docRef);
      setUserData({ ...snap.data(), id: uid });

      toast.success('Profile updated successfully!');
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>

          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : prevImage || assets.avatar_icon
              }
              alt="Profile Avatar"
              className="avatar-preview"
            />
            <span>Upload Profile Image</span>
          </label>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Write Profile Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          <button type="submit">Save</button>
        </form>

        <img
          src={image?URL.createObjectURL(image): prevImage ?prevImage:assets.logo_icon}
          alt="App Logo"
          className="profile-logo"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
