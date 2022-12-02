import React, { useState, useEffect } from 'react'
import SearchResults from './SearchResults';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import QuickAdd from '../../../components/QuickAdd/QuickAdd'

const HeaderSearch = () => {
    const userid = JSON.parse(localStorage.getItem('user'))._id
    const [keyword, setKeyword ]= useState('');
    const [events, setEvents] = useState([]);
    const [connections, setConnections] = useState([]);
    const [notes, setNotes] = useState(null);
    const [emails, setEmails] = useState(null)
    const [modalViewOpen, setModalViewOpen] = useState(false)
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [searchConnParams] = useState(["firstname", "lastname", "company", "position", "phone", "email"]);
    const [searchEventParams] = useState(["title", "type"]);
    const [searchNoteParams] = useState(["title", "content"]);
    const [searchEmailParams] = useState(["subject", "snippet"]);
    const [sortedAllResults, setSortedAllResults] = useState([]);
    const [currentAllResults, setCurrentAllResults] = useState([]);
    const [activeBtn, setActiveBtn] = useState('all')
    const [userID, setUserID] = useState(userid)

    const navigate = useNavigate();

    useEffect(() => {
        try{
            setUserID(JSON.parse(localStorage.getItem('user'))._id)
          } catch (error){
            console.error(error);
          }

        const getConnections = async () => {
            const res = await fetchConnections();
            setConnections(res);
          };
      
          getConnections();
        }, [userID]);


    useEffect(() => {
        const getActivities = async () => {
            const activities = await fetchActivities()
    
            setEvents(activities)
        }
    
        getActivities()
        }, [userID])

    useEffect(() => {
        const getNotes = async () => {
            const res = await fetchNotes();
            setNotes(res);
        }
    
        getNotes()
        }, [userID])
    
    useEffect(() => {
        const getEmails = async () => {
            const res = await fetchEmails();
            setEmails(res);
        }
    
        getEmails()
        }, [userID])


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

        //Fetch All Emails For Client
    const fetchEmails = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gmails/${userID}/get`)
    const data = await response.json()
        return data

  }


    const toggleEvent = (id) => {
        navigate(`/calendar?eventId=${id}`)
        setKeyword('')
        search('')
    }

    const toggleConnDetail = (id) => {
        navigate(`connections/?connectionId=${id}`)
        console.log("connection clicked")
        setKeyword('')
        search('')
    }

    const toggleNoteDetail = (note_id, conn_id) => {
        navigate(`connections/?connectionId=${conn_id}&noteId=${note_id}`)
        console.log("note clicked")
        setKeyword('')
        search('')
    }

  

    const search = (queryStr) => {
        if (queryStr === "") {
            setFilteredConnections([]);setFilteredEvents([]); setFilteredNotes([]); setFilteredEmails([]);setSortedAllResults([]); setActiveBtn('all')
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
        
        let filteredEmls = emails.filter((item) => {
            return searchEmailParams.some((searchEmailParam) => {
                return (          
                    item[searchEmailParam]
                        .toString()
                        .toLowerCase()
                        .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        filteredEmls.map((email)=> email.class = "email") ;
        setFilteredEmails(filteredEmls);

        
        const allResults = [...filteredConn, ...filteredEve, ...filteredNts, ...filteredEmls];    
          
        allResults.sort((x, y) => {
            return new Date(x.updatedAt) <= new Date(y.updatedAt) ? 1 : -1
        })
        setSortedAllResults(allResults)
        setCurrentAllResults(allResults)
       
         
    }
    }

       //event filter
       const EventSearchFilter = () =>  {
        setCurrentAllResults(filteredEvents)
        setActiveBtn('event')
    }

        //connecion filter
        const ConnectionSearchFilter = () =>  {
        setCurrentAllResults(filteredConnections)
        setActiveBtn('connection')
        }

        //note filter
        const NoteSearchFilter = () =>  {
        setCurrentAllResults(filteredNotes)
        setActiveBtn('note')
        }

        //email filter
        const EmailSearchFilter = () =>  {
        setCurrentAllResults(filteredEmails)
        setActiveBtn('email')
        }
 
        //all filter
        const AllSearchFilter = () =>  {
        setCurrentAllResults(sortedAllResults)
        setActiveBtn('all')
        }
       
    

    return (
        <div className="header-search-qa">
            <form className="header-search-form" autoComplete="off">
                <input id="header-search-input" type="text" placeholder="Search" value={keyword} onChange={e => {setKeyword(e.target.value); search(e.target.value); setActiveBtn('all')}} />
                <button type="submit">
                    <i className="icon-search"></i>
                </button>
            </form>
          
            <SearchResults filteredConnections={filteredConnections} filteredEvents={filteredEvents}  filteredNotes={filteredNotes} filteredEmails={filteredEmails} modalOpen={modalViewOpen} onToggleEvent= {toggleEvent} onToggleConn = {toggleConnDetail} onToggleNote = {toggleNoteDetail} currentAllResults={currentAllResults} EventSearchFilter={EventSearchFilter} ConnectionSearchFilter={ConnectionSearchFilter} NoteSearchFilter={NoteSearchFilter} EmailSearchFilter={EmailSearchFilter} AllSearchFilter={AllSearchFilter} activeBtn={activeBtn}/>

            <QuickAdd />
        </div>
    )
}

export default HeaderSearch