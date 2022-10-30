import React from 'react'
import { useState } from 'react'
import { useSignup } from './hooks/useSignup'


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
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, email, password)  
    console.log(firstName, lastName, email, password)  
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  
  return (
    <>
      <section className="page-signup">
        <h1>Sign up to your <img src="" alt="credence-logo" />account</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          
          <label  htmlFor="firstname">First name/Nick name</label>
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
          <input  type={ pwShow ?  "text" : "password" } 
                  htmlFor="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}      
          />
          
          {/* <button onClick={() =>setPwShow(true) }>See PW</button>
          <button onClick={() =>setPwShow(false)}>Hide PW</button> */}

          <button type={"submit"}>Signup</button>
          {error && <div className='error'>{error}</div>}
        </form>
       
        <div>OR</div>
        <button>Sign in with Google</button>
      </section>
    </>
  )
}

export default Signup