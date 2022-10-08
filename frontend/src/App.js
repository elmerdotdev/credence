import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Connections from './pages/Connections/Connections';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';

import './App.css';

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
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
