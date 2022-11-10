import React, { useState, useEffect } from 'react'
import SearchResults from './SearchResults';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Notes from '../../Notes/Notes'

const HeaderSearch = () => {
    const [keyword, setKeyword ]= useState('');
    const [events, setEvents] = useState([]);
    const [connections, setConnections] = useState([]);
    const [notes, setNotes] = useState(null)
    const [modalViewOpen, setModalViewOpen] = useState(false)
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchConnParams] = useState(["firstname", "lastname", "company", "position", "phone", "email"]);
    const [searchEventParams] = useState(["title", "type"]);
    const [searchNoteParams] = useState(["title", "content"]);
    const [sortedAllResults, setSortedAllResults] = useState([]);

    const userID = "63645e4850049bfd1e89637a";
    const navigate = useNavigate();

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

    useEffect(() => {
        const getNotes = async () => {
            const res = await fetchNotes();
            setNotes(res);
        }
    
        getNotes()
        }, [])


    // Fetch Connections
    const fetchConnections = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`);
        const data = await res.json();
        return data;
    };

    // Get all activities/events
    const fetchActivities = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`)
        const data = await res.json()

        return data
    }

     //Fetch All Notes For Client
     const fetchNotes = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${userID}`)
        const data = await response.json()
  
        if (response.ok) {
            return data
        }
      }

    const toggleEvent = (id) => {
        navigate(`/calendar?eventId=${id}`)
        setKeyword('')
        search('')
    }

    const toggleConnDetail = (id) => {
        navigate(`connections/?connectionId=${id}`)
        // console.log(id)
        console.log("connection clicked")
        setKeyword('')
        search('')
    }

    const toggleNoteDetail = (note_id, conn_id) => {
        navigate(`connections/?connectionId=${conn_id}&noteId=${note_id}`)
        // open connection modal -> open note modal
        console.log("note clicked")
        setKeyword('')
        search('')
    }

  

    const search = (queryStr) => {
        if (queryStr === "") {
            setFilteredConnections([]);setFilteredEvents([]); setFilteredNotes([]); setSortedAllResults([]);
        }else{
            let filteredConn = connections.filter((item) => {
                return searchConnParams.some((searchConnParam) => {
                    return (
                        item[searchConnParam]
                            .toString()
                            .toLowerCase()
                            .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        filteredConn.map((connection)=> connection.class = "connection") ;
        setFilteredConnections(filteredConn);
        

        let filteredEve = events.filter((item) => {
            return searchEventParams.some((searchEventParam) => {
                return (
                    item[searchEventParam]
                        .toString()
                        .toLowerCase()
                        .indexOf(queryStr.toLowerCase()) > -1
                );
            });
        });
        filteredEve.map((event)=> event.class = "event") ;
        setFilteredEvents(filteredEve);
        
        
        let filteredNts = notes.filter((item) => {
            return searchNoteParams.some((searchNoteParam) => {
                return (          
                    item[searchNoteParam]
                        .toString()
                        .toLowerCase()
                        .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        filteredNts.map((note)=> note.class = "note") ;
        setFilteredNotes(filteredNts);

        const allResults = [...filteredConn, ...filteredEve, ...filteredNts];    
          
        allResults.sort((x, y) => {
            return new Date(x.updatedAt) <= new Date(y.updatedAt) ? 1 : -1
        })
        setSortedAllResults(allResults)
    }
    }



    return (
        <div className="header-search-qa">
            <form className="header-search-form" autoComplete="off">
                <input id="header-search-input" type="text" placeholder="Search" value={keyword} onChange={e => {setKeyword(e.target.value); search(e.target.value)}} />
                <button type="submit">
                    <i className="icon-search"></i>
                </button>
            </form>
          
            <SearchResults filteredConnections={filteredConnections} filteredEvents={filteredEvents}  filteredNotes={filteredNotes} modalOpen={modalViewOpen} onToggleEvent= {toggleEvent} onToggleConn = {toggleConnDetail} onToggleNote = {toggleNoteDetail} sortedAllResults={sortedAllResults}/>

 
            <button className="header-quick-add">
                <span>Quick Add</span>
                <i className="icon-plus"></i>
            </button>
        </div>
    )
}

export default HeaderSearch