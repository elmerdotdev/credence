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
import './App.css';
import logo from './images/logo.svg';

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
                <Route path ="/notes/:client_id/:id" element={<ViewNote />} />
                <Route path = "notes/edit/:client_id/:id" element={<EditNote />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
