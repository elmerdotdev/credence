import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'
import HeaderSearch from '../../pages/Search/components/HeaderSearch'
import MobileMenu from '../MobileMenu/MobileMenu'

const Header = (props) => {
  const [userIdExists, setUserIdExists] = useState(false);
  let userID = null;

  window.addEventListener('storage', () => {
    setUserIdExists(true)
})
  useEffect(() => {
    console.log('header.js useeffect')
    try {
        userID = JSON.parse(localStorage.getItem('user'))._id
        setUserIdExists(true)
    
      } catch (error){
        console.error(error);
      }
    }, []);

  return (
    <header>
        <div className="logo">
            <NavLink to="/dashboard">
                <Logo />
            </NavLink>
        </div>

        <div className="search">
            {userIdExists ?  (<HeaderSearch />): (<NavLink to="/login"></NavLink> )}
        </div>

        <div className="mobile-menu">
            <MobileMenu onToggleMenu={props.onToggleMenu}/>
        </div>
    </header>
  )
}

export default Header