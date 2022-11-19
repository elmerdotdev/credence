import React from 'react'
import AccountSettings from './AccountSettings'
import AppSettings from './AppSettings'

const Settings = () => {
  return (
    <section className="page-settings">
      <AccountSettings/>
      <AppSettings/>
    </section>
  )
}

export default Settings