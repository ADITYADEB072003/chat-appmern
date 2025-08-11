import React, { useState } from 'react'
import './Login.css';
import assets from '../../assets/assets'
import { signup } from '../../config/firebase';
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(currentState === 'Sign Up'){
      await signup(username, email, password);
    } else {
      await login(email, password);
    }
  }
  
  return (
    <div className='login'>
      <img src={assets.logo_big} alt='chat-logo' className='logo' />
      <form className='login-form' onSubmit={onSubmitHandler}>
        <h2>{currentState}</h2>

        {currentState === "Sign Up" && (
          <input onChange={(e) => {
            setUsername(e.target.value)
          }} value={username}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        <input onChange={(e) => {
          setEmail(e.target.value)
        }} value={email}
          type="email"
          placeholder="Email"
          className="form-input"
          required
        />

        <input onChange={(e) => {
          setPassword(e.target.value)
        }} value={password}
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
