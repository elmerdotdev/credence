import React from 'react'
import { Link } from 'react-router-dom'



const SuccessSignup = () => {
  return (
    <div className='page-signup-successSignup'>
        <div className='header-arrow'>
            <p>return</p>
            <p>delete</p>
        </div>
        
        <h1>Sign Up Completed!</h1>
        <p>Welcome to <img src="" alt="credence-logo"/>!</p>
        <p>Thank you for taking the time to sign up. Keep up the good work!</p>

        <button><Link to="/selectplan" >Next</Link></button>

        
    </div>
  )
}

export default SuccessSignup