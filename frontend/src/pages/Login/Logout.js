import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../Signup/hooks/useLogout' 
import '../../fontello/css/credence.css';

const Logout = (props) => {
  const { logout } = useLogout()
  const { onModelIsOpen, onSetModalIsOpen} = props;
  
  //Logout submit action
  const navigate = useNavigate()
  const handleLogout = () => {  
    if(localStorage.getItem('user')){
      logout()
      console.log('Logout bye!')
      onSetModalIsOpen(false)
      navigate('/login')
    }else{
      return null
    }
  }
  //back to dashboard page (Click Cancel button)
  const cancelLogout = () => {
    onSetModalIsOpen(false)
  }
      

  return (
    <div className="page-logout">
      <div className="circle">
        <i className='icon-logout'></i>
      </div>
      <p>Are you sure you want to logout?</p>
      
      <div className="btn-area">
        <button className='btn btn-primary-reverse' onClick={cancelLogout}>Cancel</button>
        <button className='btn btn-primary' onClick={handleLogout} type={"submit"}>Logout</button>
      </div>
    </div>
  )
}

export default Logout