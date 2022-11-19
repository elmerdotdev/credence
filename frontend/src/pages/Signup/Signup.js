import React, { useState, useEffect } from 'react'
import { useNavigate, Link  } from 'react-router-dom'
import { useSignup } from './hooks/useSignup'
//Icon & Logo
import '../../fontello/css/credence.css';
import logo from '../../images/logo.svg';
import signupimage from '../../images/Register/signupimage.svg';
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
  const [lastLoggedIn, setLastLoggedIn] = useState(null)
  //Error checker
  const {signup, error, isLoading} = useSignup()

  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

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

    //Signup success, check user in localstorage then move to next page 
    if (localStorage.getItem('user')){
      console.log('Success Signup!')
      navigate('/successsignup')
    }else{
      console.log('Signup not successed.')
    }
   }//end of handleSubmit


  //Password Toggle
  const togglePw = () => {
    setPwShow(!pwShow)
  }
  
  return (
    <div className="page-signup">
      <section className="page-signup-area">
        <Link to="/" ><i className='icon-close'></i></Link>
        <h3><span>Create a</span><span><img src={logo} alt="credence logo"  className='credence-logo'/>Account</span></h3>

        <div className="desktop-grid">
            <img src={signupimage} alt="signup-img" className='signup-img'/>
          
          <div className="signup-form">
            <form className="signup-form" onSubmit={handleSubmit}>
          
              <label  htmlFor="firstname">First Name / Nickname<span className="required-star"> *</span></label>
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
              
              <label  htmlFor="email" name="email" >Email<span className="required-star"> *</span></label>
              <input  type="email"
                      htmlFor="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
              />
              
              <label  htmlFor="password">Password<span className="required-star"> *</span></label>
              <div className="password-area">
                <input  type={ pwShow ? "text" :"password"}
                        htmlFor="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                />
                <i  className={pwShow === true ? "icon-hide" : "icon-show"}
                    onClick={togglePw}
                >
                </i>   
              </div>
             

              <button type="submit" className="submit-signup-btn btn btn-primary">Sign Up</button>
              {error && <div className='error'>{error}</div>}

            </form>
          </div>
        </div>
       
        {/* <div>OR</div> */}
        {/* <GoogleLoginButton/> */}
      </section>
    </div>
  )
}
export function useLastLogin() {
  const [lastLoggedIn, setLastLoggedIn] = useState(null)

  return{lastLoggedIn, setLastLoggedIn}
}
export default Signup











