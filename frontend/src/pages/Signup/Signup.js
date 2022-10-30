import React from 'react'
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useSignup } from './hooks/useSignup'
// import GoogleLoginButton from '../../components/GoogleLoginButton'


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
  //lastLoggedIn
  const [lastLoggedIn, setlastLoggedIn] = useState(null)
  //Error checker
  const {signup, error, isLoading} = useSignup()


  //Signup submit action
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstName, lastName, email, password, lastLoggedIn)  
    console.log(firstName, lastName, email, password, lastLoggedIn)  
    
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')

    //ここを何のタイミングでsignupできたにすればいいかわからない
    // if (error.response.states){
    //   console.log('omedetou!')
    //   // navigate('/successsignup')
    // }else if(error){
    //   console.log('sorry')
    // }
   
    //Signupできたらlocalstorage見て、201確認。そして次のページへ移動。
      if (localStorage.getItem('user')){
      console.log('Success Signup!')
  
      navigate('/successsignup')
      // navigate('/confirmsignup')  
    }else{
      console.log('Signup not successed.')
    }
   }//end of handleSubmit


  //Password Toggle
  const togglePw = () => {
    setPwShow(!pwShow)
  }
  
  return (
    <>
      <section className="page-signup">
        <h1>Create <img src="" alt="credence-logo" />account</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          
          <label  htmlFor="firstname">First Name / Nickname<span className="required-star">*</span></label>
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

          <label  htmlFor="email" name="email" >Email<span className="required-star">*</span></label>
          <input  type="email" 
                  htmlFor="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
          />

          <label  htmlFor="password">Password<span className="required-star">*</span></label>
          <input  type={ pwShow ? "text" :"password"} 
                  htmlFor="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}      
          />
          <button onClick={togglePw} type="button">show password</button>
          
          <button type="submit" className="submit-signup-btn">Sign Up</button>
          {error && <div className='error'>{error}</div>}
        </form>
       
        {/* <div>OR</div> */}
        {/* <GoogleLoginButton/> */}
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
