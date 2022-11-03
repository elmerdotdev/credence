import React, { useState, useEffect } from 'react'
import SearchResults from './SearchResults';
import ViewEvent from '../../Calendar/components/ViewEvent'

const HeaderSearch = () => {
    const [keyword, setKeyword ]= useState('');
    const [events, setEvents] = useState([]);
    const [connections, setConnections] = useState([]);
    const [modalViewOpen, setModalViewOpen] = useState(false)
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchConnParams] = useState(["firstname", "lastname", "company", "position", "phone", "email"]);
    const [searchEventParams] = useState(["title", "type"]);

    useEffect(() => {
        const getConnections = async () => {
            const res = await fetchConnections();
            setConnections(res);
          };
      
          getConnections();
        }, []);

    useEffect(() => {
        const getActivities = async () => {
            const activities = await fetchActivities()
    
            setEvents(activities)
        }
    
        getActivities()
        }, [])


    // Fetch Connections
    const fetchConnections = async () => {
        const res = await fetch('https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea');
        const data = await res.json();
        return data;
    };

    // Get all activities/events
    const fetchActivities = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/633b6a81145c9d79405c54ea`)
        const data = await res.json()

        return data
    }

    const toggleViewModal = (status) => {
        setModalViewOpen(status)
         console.log("Event search result has been clicked!")
    }

  

    const search = (queryStr) => {

        if (queryStr === "") {
            setFilteredConnections([]);setFilteredEvents([])
        }else{
            const filteredConn = connections.filter((item) => {
                return searchConnParams.some((searchConnParam) => {
                    return (
                        item[searchConnParam]
                            .toString()
                            .toLowerCase()
                            .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        setFilteredConnections(filteredConn);

            const filteredEve = events.filter((item) => {
                return searchEventParams.some((searchEventParam) => {
                    return (
                        item[searchEventParam]
                            .toString()
                            .toLowerCase()
                            .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        setFilteredEvents(filteredEve);}
    }
    return (
        <div className="header-search-qa">
            <form className="header-search-form">
                <input id="header-search-input" type="text" placeholder="Search" value={keyword} onChange={e => {setKeyword(e.target.value); search(e.target.value)}} />
                <button type="submit">
                    <i className="icon-search"></i>
                </button>
            </form>
          
            <SearchResults filteredConnections={filteredConnections} filteredEvents={filteredEvents}  modalOpen={modalViewOpen} onToggle= {() => toggleViewModal}/>
            {modalViewOpen &&
            <ViewEvent modalOpen={modalViewOpen} onToggle={toggleViewModal} />}
 
            <button className="header-quick-add">
                <span>Quick Add</span>
                <i className="icon-plus"></i>
            </button>
        </div>
    )
}

export default HeaderSearch