import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Connections from './pages/Connections/Connections';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';
import Notes from './pages/Notes/Notes';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import './App.css';

function App() {
    return (
        <BrowserRouter>
        <div className="App">
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
                            <li><Link to="/">Dashboard</Link></li>
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
                <div class="App-body">
                    <Routes>
                        <Route key="1" path="/" element={<Dashboard />} />
                        <Route key="2" path="/calendar" element={<Calendar />} />
                        <Route key="3" path="/connections" element={<Connections />} />
                        <Route key="4" path="/search" element={<Search />} />
                        <Route key="5" path="/settings" element={<Settings />} />
                        <Route key="6" path="/notes" element={<Notes />} />
                        <Route key="7" path="/login" element={<Login />} />
                        <Route key="8" path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </section>
        </div>
        </BrowserRouter>
    );
}

export default App;
