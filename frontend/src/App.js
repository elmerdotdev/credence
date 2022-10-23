import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// App pages
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Connections from './pages/Connections/Connections';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// Landing Pages
import Home from './pages/Landing/Home/Home';
import Features from './pages/Landing/Features/Features';
import Pricing from './pages/Landing/Pricing/Pricing';
import About from './pages/Landing/About/About';

import './App.css';
import logo from './images/logo.svg';

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <header>
                <div className="logo">
                    <img src={logo} alt="Credence Logo" />
                </div>
                <div className="search">
                    <span>Search</span>
                </div>
            </header>
            <section className="container">
                <aside>
                    <nav className="App-navigation">
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
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/connections" element={<Connections />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </section>
=======
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
>>>>>>> 29a4359 (added modals for notes)
        </div>
        </BrowserRouter>
    );
}

export default App;
