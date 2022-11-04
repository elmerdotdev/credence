import React from 'react'
import { Link } from 'react-router-dom'
//Icon & Logo
import '../../fontello/css/credence.css'
import logo_nopadding from '../../images/logo_nopadding.svg'
import signupimage from '../../images/signupimage.svg'

const SuccessSignup = () => {
  
  //delete user status:200 from localstorage when click "next btn" 
  const dlt200LocalStorage = () => {
    localStorage.removeItem('user')
  }
  
  return (
    <div className='page-signup-successSignup'>
      <section className='page-successSignup-area'>
          <div className='header-arrow'>
              <Link to="/signup"><i className='icon-arrow-left'></i></Link>
              <Link to="/"><i className='icon-close'></i></Link>
          </div>
      
          <h3>Sign Up Complete!</h3>
          <p><span>Welcome to</span><img src={logo_nopadding} alt="credence-logo" className='credence-logo'/> !</p>
          <p>Thank you for taking the time to sign up. Keep up the good work!</p>
          
          <img src={signupimage} alt="signup-img" className='signup-success-image'/>
          
          <button onClick={dlt200LocalStorage}><Link to="/login" >Next</Link></button>
      </section>
    </div>
  )
}

export default SuccessSignup