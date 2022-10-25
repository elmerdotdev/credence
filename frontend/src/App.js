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
import ConfirmSignup from './pages/Signup/ConfirmSignup';
import SuccessSignup from './pages/Signup/SuccessSignup';
import SelectPlan from './pages/Signup/SelectPlan';

function App() {
    return (
        <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/confirmsignup" element={<ConfirmSignup />} />
                <Route path="/successsignup" element={<SuccessSignup/>} />
                <Route path="/selectplan" element={<SelectPlan />} />
                
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
