import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'
import HeaderSearch from '../../pages/Search/components/HeaderSearch'
import MobileMenu from '../MobileMenu/MobileMenu'

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
            <MobileMenu />
        </div>
    </header>
  )
}

export default Header