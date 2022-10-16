import React from 'react'
import { Link } from 'react-router-dom'

const SuccessSignup = () => {
  return (
    <div className='page-signup-complete-page'>
          <p>Welcome to <img src="" alt="credence-logo" /></p>
          <p>Thank you for taking the time to sign up. Keep up the good work!</p>
          <Link>Next</Link>
    </div>
  )
}

export default SuccessSignup