import React from 'react'
import { useState } from 'react'
import { useSignup } from './hooks/useSignup'

const Signup = () => {
  
  //FIRST NAME
  const [firstName, setFirstName] = useState('')
  //LAST NAME
  const [lastName, setLastName] = useState('')
  //EMAIL
  const [email, setEmail] = useState('')
  //PASSWORD
  const [password, setPassword] = useState('')
  //PASSWORD hide or show
  const [pwShow, setPwShow] = useState(true)

  const {signup, error, isLoading} = useSignup()

  //Submit action
  const handleSubmit = async (e) => {
    e.prevebtDefault()

    await signup(firstName, lastName, email, password)
  }
  
  
  return (
    <>
      <section className="page-signup">
        <h1>Sign up to your <img src="" alt="credence-logo" />account</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label  htmlFor="firstname">First Name/Nick name</label>
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
          <input  type={ pwShow ? "text": "password"} 
                  htmlFor="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
          />

          {/* <button type="submit" disabled={isLoading} ><Link to="/confirm" >Sign Up</Link></button> */}
          <button type="submit" disabled={isLoading} >Signup</button>
          {error && <div className='error'>{error}</div>}
        </form>

        <div>OR</div>
        <button >Sign in with Google</button>
      </section>
    </>
  )
}

export default Signup