import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../Signup/hooks/useLogout' 

const Logout = (props) => {
    const { logout } = useLogout()
    
    //Logout submit action
    const handleLogout = () => {  
      if(localStorage.getItem('user')){
        logout()
        console.log('Logout')
      }else{
        return null
      }
    }
  
    return (
    <>
       <li onClick={props.onToggleMenu}><i className="icon-logout" ></i> <NavLink to='/login' onClick={handleLogout} type={"submit"}>Log Out</NavLink></li>
    </>
  )
}

export default Logout
