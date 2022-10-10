import React from 'react'
import { useState } from 'react';
import {Routes, Route } from "react-router-dom"

const Signup = () => {
  
  //USER NAME
  const [userName, setUserName] = useState(""); 
  //EMAIL
  const [email, setEmail] = useState("");
  //PADDWORD
  const [password, setPassword] = useState("");
  //PASSWORD hide or display
  const [pwDisplay, setPwDisplay] = useState(false);

  
  return (
    <>
    <section className="page-signup">Signup</section>
    <form action="submit">
      <label  for="name">Name</label>
      <input  type="text" 
              for="name" 
              value={userName}
      />
      
      <label  for="email" name="email" >Email</label>
      <input  type="text" 
              for="email"
              value={email}
      />
      
      <label  for="password">Password</label>
      <input  type={ pwDisplay ? "text": "password"} 
              for="password" 
              value={password}
      />

      <button type="submit" >Sign Up</button>
      <div>OR</div>
      <button >Sign in with Google</button>
    </form>
    
    <Routes>
      <Route path='/'>
        <div className='page-signup-confirm-page'>
          <p>We have sent a confirmation email to {email}. Please check your inbox to complete your registration.</p>
          <img src="" alt="" />
          <button>Next</button>
        </div>
      </Route>
      <Route>
        <div className='page-signup-complete-page'>
          <p>Welcome to <img src="" alt="logo credence" /></p>
          <p>Thank you for taking the time to sign up. Keep up the good work!</p>
          <button>Next</button>
        </div>
      </Route>
    </Routes>
    
    
    
    
    
    
    </>
  )
}

export default Signup