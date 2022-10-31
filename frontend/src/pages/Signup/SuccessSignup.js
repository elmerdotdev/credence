import React from 'react'
import { Link } from 'react-router-dom'



const SuccessSignup = () => {
  
  //delete user status:200 from localstorage when click "next btn" 
  const dlt200LocalStorage = () => {
    localStorage.removeItem('user')
  }
  
  return (
    <div className='page-signup-successSignup'>
        {/* <div className='header-arrow'>
            <p>return</p>
            <p>delete</p>
        </div> */}
        
        <h3>Sign Up Complete!</h3>
        <p>Welcome to <img src="" alt="credence-logo" className='img.credence-logo'/>!</p>
        <p>Thank you for taking the time to sign up. Keep up the good work!</p>

        <img src="" alt="signup-complete-image" className='signup-complete-image'/>


        <button onClick={dlt200LocalStorage}><Link to="/login" >Next</Link></button>

        
    </div>
  )
}

export default SuccessSignup