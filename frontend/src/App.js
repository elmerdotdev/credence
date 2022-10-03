// Pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Connections from './pages/Connections';
import Search from './pages/Search';
import Settings from './pages/Settings';

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
