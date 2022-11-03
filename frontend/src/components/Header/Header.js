import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'
import HeaderSearch from '../../pages/Search/components/HeaderSearch'

const Header = () => {
  return (
    <header>
        <div className="logo">
            <NavLink to="/dashboard">
                <Logo />
            </NavLink>
        </div>

        <div className="search">
            <HeaderSearch />
        </div>

        <div className="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
  )
}

export default Header