import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

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
    return (
        <BrowserRouter>
        <div className="App">
            <Header />
            <section className="container">
                <aside>
                    <nav className="App-navigation">
                        <ul>
                            <li><i className="icon-dashboard"></i> <NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li><i className="icon-connection"></i> <NavLink to="/connections">Connection</NavLink></li>
                            <li><i className="icon-calendar"></i> <NavLink to="/calendar">Calendar</NavLink></li>
                            <li><i className="icon-profile"></i> <NavLink to="/profile" >Profile</NavLink></li>
                        </ul>
                        <ul>
                            <li><i className="icon-settings"></i> <NavLink to="/settings">Settings</NavLink></li>
                            <li><i className="icon-logout"></i> <NavLink to="/logout">Log Out</NavLink></li>
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

                    </Routes>
                </div>
            </section>
        </div>
        </BrowserRouter>
    );
}

export default App;
