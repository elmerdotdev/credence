import React from 'react'
import { useState } from 'react';
import { useLogin } from '../Signup/hooks/useLogin';
 

const Login = () => {
  
   //EMAIL
   const [email, setEmail] = useState('');
   //PASSWORD
   const [password, setPassword] = useState('');
   // //PASSWORD hide or show
   const [pwShow, setPwShow] = useState(true);
   //Error checker
   const {login, error, isLoading} = useLogin();
 
  //Submit action
  const handleSubmit = async (e) => {
    e.prevebtDefault()

    await login(email, password)
    console.log(email, password)
  }
  
  return (
    <>
    <section className="page-login">Login</section>
    <h1>Log in to your <img src="" alt="credence-logo" />account</h1>
    
    <form className="login-form" onSubmit={handleSubmit}>
     
      <label  htmlFor="email" name="email" >Email</label>
      <input  type="email" 
              htmlFor="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
      />
      
      <label  htmlFor="password">Password</label>
      <input  type={ pwShow ? "text": "password"} 
              htmlFor="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading} type="submit"  >Login</button>
        {error && <div className='error'>{error}</div>} 
      <div>OR</div>
      <button >Log in with Google</button> 
    </form>

    </>
  )
}

export default Login