import React from 'react'
import AccountSettings from './AccountSettings'
import AppSettings from './AppSettings'

const Settings = ({ onDarkMode, darkModeToggle }) => {
  return (
    <section className="page-settings">
      <AccountSettings/>
      <AppSettings onDarkMode={onDarkMode} darkModeToggle={darkModeToggle} />
    </section>
  )
}

export default Settings