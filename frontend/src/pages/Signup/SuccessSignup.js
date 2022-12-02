import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
//Icon & Logo
import '../../fontello/css/credence.css'
import signupimage from '../../images/Register/signupimage.svg'

const SuccessSignup = () => {

  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  
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
      
          <h3>Sign Up Completed!</h3>
          <p className='welcome-credence'>Welcome to Credence!</p>
          <p>Thank you for taking the time to sign up. Keep up the good work!</p>
          
          <img src={signupimage} alt="signup-img" className='signup-success-image'/>
          
          <Link to="/login" ><button onClick={dlt200LocalStorage} className="btn btn-primary">Next</button></Link>
      </section>
    </div>
  )
}

export default SuccessSignup