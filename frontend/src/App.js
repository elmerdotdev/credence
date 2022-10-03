// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Connections from './pages/Connections/Connections';
import Search from './pages/Search/Search';
import Settings from './pages/Settings/Settings';

import './App.css';

function App() {
    return (
        <div className="App">
            <Dashboard />
            <Calendar />
            <Connections />
            <Search />
            <Settings />
        </div>
    );
}

export default App;
