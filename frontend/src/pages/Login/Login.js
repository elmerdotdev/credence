import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLoginButton from '../../components/GoogleLoginButton'
import { useLogin } from '../Signup/hooks/useLogin'
import { useLogout } from '../Signup/hooks/useLogout' 
 

const Login = () => {
  //Email
  const [email, setEmail] = useState('');
  //Password
  const [password, setPassword] = useState('');
  //Password display( hide or show )
  const [pwShow, setPwShow] = useState(false);
  //Error checker
  const {login, error, isLoading} = useLogin();
  

  //Login submit action 
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    await  login(email, password)
    console.log(email, password)

    setEmail('')
    setPassword('')

    if (localStorage.getItem('user')) {  
      console.log('Successs Login!')
      navigate('/')
    } else {
      console.log(' no user into localstorage')
    }
  }

  //Password toggle
  const togglePw = () => {
    setPwShow(!pwShow)
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
          <button onClick={togglePw}>show password</button>
    
          {error && <div className='error'>{error}</div>} 
         
          <input type="submit" value="Login" className="submit-login-btn" />
        </form>
        
        <Link>Forgotten your password?</Link>
        <div>OR</div>
        <GoogleLoginButton/>
    
        <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
        
        <button onClick={handleLogout} type={"submit"}>logout</button>
      </section>
    </>
  )
}

export default Login