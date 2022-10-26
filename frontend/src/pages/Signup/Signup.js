import React from 'react'
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useSignup } from './hooks/useSignup'
import GoogleLoginButton from '../../components/GoogleLoginButton'


const Signup = () => {
  
  //First name
  const [firstName, setFirstName] = useState('')
  //Last name
  const [lastName, setLastName] = useState('')
  //Email
  const [email, setEmail] = useState('')
  //Password
  const [password, setPassword] = useState('')
  //Password display( hide or show )
  const [pwShow, setPwShow] = useState(false)
  //Error checker
  const {signup, error, isLoading} = useSignup()


  //Signup submit action
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, email, password)  
    console.log(firstName, lastName, email, password)  
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')

    if (localStorage.getItem('user')){
      console.log('Success Signup!')
      navigate('/confirmsignup')
    }else{
      console.log(' no user into localstorage')
    }
  }

  //Password Toggle
  const togglePw = () => {
    setPwShow(!pwShow)
  }
  
  return (
    <>
      <section className="page-signup">
        <h1>Create <img src="" alt="credence-logo" />account</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          
          <label  htmlFor="firstname">First Name / Nickname</label>
          <input  type="text" 
                  htmlFor="firstname" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
          />

          <label  htmlFor="lastname">Last Name</label>
          <input  type="text" 
                  htmlFor="lastname" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
          />

          <label  htmlFor="email" name="email" >Email</label>
          <input  type="email" 
                  htmlFor="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
          />

          <label  htmlFor="password">Password</label>
          <input  type={ pwShow ? "text" :"password"} 
                  htmlFor="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}      
          />
          <button onClick={togglePw}>show password</button>
          
          <button type="submit" className="submit-signup-btn">Sign Up</button>
          {error && <div className='error'>{error}</div>}
        </form>
       
        <div>OR</div>
        <GoogleLoginButton/>
      </section>
    </>
  )
}

export default Signup










//===Signup====

//Google Loginの機能
//confirmation emailの機能
//set google console & google authentication
//===Login====
//Google Loginの機能


//==Logout===
//NavigationにLogoutのTagをつける
