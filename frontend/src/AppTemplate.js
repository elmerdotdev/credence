import React from 'react'
import { Link } from 'react-router-dom'

const AppTemplate = (props) => {
  return (
    <div>
        <header>
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <div className="search">
                <span>Search</span>
            </div>
        </header>
        <section className="container">
            <aside>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/connections">Connection</Link></li>
                        <li><Link to="/calendar">Calendar</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/logout">Log Out</Link></li>
                    </ul>
                </nav>
            </aside>
            <div className="App-body">
                {props.children}
            </div>
        </section>
    </div>
  )
}

export default AppTemplate