import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Modal from "react-modal"

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
import SuccessSignup from './pages/Signup/SuccessSignup';
import Reports from './pages/Reports/Reports';
import Logout from './pages/Login/Logout';

// Landing Pages
import Home from './pages/Landing/Home/Home';
import Features from './pages/Landing/Features/Features';
import Pricing from './pages/Landing/Pricing/Pricing';
import About from './pages/Landing/About/About';

// Components
import Header from './components/Header/Header';

// CSS and scripts
import './fontello/css/credence.css';
import './App.css';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        document.body.classList.toggle('mobile-menu-visible', isMenuOpen)
    } , [isMenuOpen])

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <BrowserRouter>
        <div className="App">
            <Header onToggleMenu={toggleMobileMenu}/>
            <section className="container">
                <aside>
                    <nav className="App-navigation">
                        <ul>
                            <li onClick={toggleMobileMenu}><i className="icon-home"></i> <NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li onClick={toggleMobileMenu}><i className="icon-connection"></i> <NavLink to="/connections">Connection</NavLink></li>
                            <li onClick={toggleMobileMenu}><i className="icon-calendar"></i> <NavLink to="/calendar">Calendar</NavLink></li>
                            <li onClick={toggleMobileMenu}><i className="icon-reports"></i><NavLink to="/reports">Reports</NavLink></li>
                            <li onClick={toggleMobileMenu}><i className="icon-profile"></i> <NavLink to="/profile">Profile</NavLink></li>
                            <li className="mister-spacer"></li>
                            <li onClick={toggleMobileMenu}><i className="icon-settings"></i> <NavLink to="/settings">Settings</NavLink></li>
                            <li onClick={() => {toggleMobileMenu(); setModalIsOpen(true);}}><i className="icon-logout"></i>Log Out</li> 
                            <Modal isOpen={modalIsOpen} className="logoutModal" ><Logout onModelIsOpen={modalIsOpen} onSetModalIsOpen={setModalIsOpen}/></Modal>
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
                        <Route path="/successsignup" element={<SuccessSignup />} />
                        <Route path="/reports" element={<Reports />} />
                    </Routes>
                </div>
            </section>
        </div>
        </BrowserRouter>
    );
}

export default App;
