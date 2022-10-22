import React from 'react'

const ConfirmSignup = ({email}) => {
  return (
    <div className='page-signup-ConfirmSignup'>
        <p>We have sent a confirmation email to {email}. Please check your inbox to complete your registration.</p>
    </div>
  )
}

export default ConfirmSignup