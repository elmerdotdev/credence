import React from 'react'
import { useState } from 'react';
import {Routes, Route } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useSignup } from './hooks/useSignup';
import Confirm from './Confirm';

const Signup = () => {
  
  //USER NAME
  const [userName, setUserName] = useState(''); 
  //EMAIL
  const [email, setEmail] = useState('');
  //PASSWORD
  const [password, setPassword] = useState('');
  //PASSWORD hide or show
  const [pwShow, setPwShow] = useState(true);

  const {signup, error, isLoading} = useSignup()

  //Submit action
  const handleSubmit = async (e) => {
    e.prevebtDefault()

    await signup(userName, email, password)
  }
  
  return (
    <>
    <section className="page-signup">Signup</section>
    <h1>Sign in to your <img src="" alt="credence-logo" />account</h1>
    
    <form className="signup-form" onSubmit={handleSubmit}>
      <label  for="name">Name</label>
      <input  type="text" 
              for="name" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
      />
      
      <label  for="email" name="email" >Email</label>
      <input  type="email" 
              for="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
      />
      
      <label  for="password">Password</label>
      <input  type={ pwShow ? "text": "password"} 
              for="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={isLoading} ><Link to="/confirm" >Sign Up</Link></button>
      {error && <div className='error'>{error}</div>}
      <div>OR</div>
      <button >Sign in with Google</button>
    </form>
    
    <Routes>
      <Route path='/confirm' element={<Confirm email={email}/>}/>
    </Routes>
    
    
    
    
    
    
    </>
  )
}

export default Signup