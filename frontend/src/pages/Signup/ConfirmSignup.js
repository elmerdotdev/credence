import React from 'react'
import {  Link } from 'react-router-dom'


const ConfirmSignup = ({email}) => {
  return (
    <div className='page-signup-confirmSignup'>
        <div className='header-arrow'>
            <p>return</p>
            <p>delete</p>
        </div>
        
        <h1>Confirm Your Account</h1>

        <p>We have sent a confirmation email to {email}. Please check your inbox to complete your registration.</p>
    
        <Link to="/successsignup" >Next</Link>
    </div>
  )
}

export default ConfirmSignup