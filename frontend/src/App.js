import Dashboard from 'components/Dashboard/Dashboard';
import Calendar from 'components/Calendar/Calendar';
import Connections from 'components/Connections/Connections';
import Search from 'components/Search/Search';
import Settings from 'components/Settings/Settings';

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
