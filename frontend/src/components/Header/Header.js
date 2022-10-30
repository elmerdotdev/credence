import React from 'react'
import { NavLink } from 'react-router-dom'
import HeaderSearch from '../../pages/Search/components/HeaderSearch'

import logo from '../../images/logo.svg';

const Header = () => {
  return (
    <header>
        <div className="logo">
            <NavLink to="/dashboard">
                <img src={logo} alt="Credence Logo" />
            </NavLink>
        </div>
        <div className="search">
            <HeaderSearch />
        </div>
    </header>
  )
}

export default Header