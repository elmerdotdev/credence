import React from 'react'
import { useState } from 'react';
import { useLogin } from '../Signup/hooks/useLogin';
import { useLogout } from '../Signup/hooks/useLogout' 
 

const Login = () => {
   //Email
   const [email, setEmail] = useState('');
   //Password
   const [password, setPassword] = useState('');
   //Password display( hide or show )
   const [pwShow, setPwShow] = useState(true);
   //Error checker
   const {login, error, isLoading} = useLogin();
 

  //Login submit action
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    console.log(email, password)

    setEmail('')
    setPassword('')
  }
  
  //Logout submit action
  const { logout } = useLogout()
  const handleLogout = () => {
      logout()
  }

  return (
    <>
    <section className="page-login">
      <h1>Login to your <img src="" alt="credence-logo" />account</h1>

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

        <button type={"submit"}>Login</button>
        {error && <div className='error'>{error}</div>} 
      </form>
      
      <div>OR</div>
      <button >Login with Google</button> 
      
      <button onClick={handleLogout} type={"submit"}>logout</button>
    </section>
    </>
  )
}

export default Login