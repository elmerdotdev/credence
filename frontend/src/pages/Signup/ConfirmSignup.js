import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import SuccessSignup from './SuccessSignup'

const Signup = ({email}) => {
  return (
    <div className='page-signup-success-page'>
            <p>We have sent a confirmation email to {email}. Please check your inbox to complete your registration.</p>
            <img src="" alt="" />
            <Link to="/SuccessSignup">Next</Link>
            <Routes>
              <Route path="/SuccessSignup" element={<SuccessSignup/>} />
            </Routes>
    </div>
   

   
  )
}

export default Signup