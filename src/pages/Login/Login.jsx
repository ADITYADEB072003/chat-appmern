import React, { useState } from 'react'
import './Login.css';
import assets from '../../assets/assets'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
   <div className='login'>
    <img src={assets.logo_big} alt='chat-logo' className='logo'/>
    <form className='login-form'>
      <h2>{currentState}</h2>
      
      {currentState === "Sign Up" && (
        <input 
          type="text" 
          placeholder="Username" 
          className="form-input"
          required 
        />
      )}
      
      <input 
        type="email" 
        placeholder="Email" 
        className="form-input"
        required 
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        className="form-input"
        required 
      />
      
      <button type="submit" className="submit-btn">
        {currentState}
      </button>
      
      <div className="login-term">
        <input 
          type="checkbox" 
          id="terms" 
          required 
        />
        <label htmlFor="terms">
          I agree to the terms and conditions
        </label>
      </div>
      
     <div className="login-forgot">
  <p onClick={() => setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up")}>
    {currentState === "Sign Up" ? 
      <>Already have an account? <span>Click here</span></> : 
      <>Create an account? <span>Click here</span></>
    }
  </p>
  {currentState === "Login" && (
    <p><span>Forgot password?</span></p>
  )}
</div>

    </form>
   </div>
  )
}

export default Login
