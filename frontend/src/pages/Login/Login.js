import React from 'react'
import { useState } from 'react'
import {Routes, Route } from "react-router-dom"
import { Link } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Signup from '../Signup/Signup'

const Login = () => {
  
  //USER NAME
  const [userName, setUserName] = useState(''); 
  //EMAIL
  const [email, setEmail] = useState('');
  //PASSWORD
  const [password, setPassword] = useState('');
  //PASSWORD hide or show
  const [pwShow, setPwShow] = useState(false);

  //Submit action
  const handleSubmit = async (e) => {
    e.prevebtDefault()

    console.log(userName, email, password)
  }
  
  return (
    <>
    <section className="page-login">Login</section>
    <h1>Sign in to your <img src="" alt="credence-logo" />account</h1>
    
    <form className="signup-form" onSubmit={handleSubmit}>
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

      <button type="submit" ><Link to="/sashboard">Login</Link></button>

      <Link to="/">Forget your password?</Link>
      <div>OR</div>
      <button >Sign in with Google</button>

      <p>Don't have an account?</p><Link to="/signup">Sign Up here</Link>
    </form>
    
    <Routes>
      <Route path='/Dashboard/Dashboard' element={<Dashboard/>}/>
      <Route path='/Signup/Signup' element={<Signup/>}/>
    </Routes>
    
    
    
    
    
    
    </>
  )
}

export default Login