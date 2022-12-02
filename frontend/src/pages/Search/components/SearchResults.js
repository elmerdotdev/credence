import ConnSearchResult from './ConnSearchResult';
import EveSearchResult from './EveSearchResult';
import NotesSearchResult from './NotesSearchResult';
import EmailSearchResult from './EmailSearchResult';
import { useState } from "react";

const SearchResults = ({ filteredConnections, filteredEvents, filteredNotes, filteredEmails, onToggleEvent, onToggleConn, onToggleNote, currentAllResults, EventSearchFilter, ConnectionSearchFilter, NoteSearchFilter, EmailSearchFilter, AllSearchFilter, activeBtn}) => {
    const [isShowClass, setShowClass] = useState(true);
 
    if (filteredConnections.length === 0 && filteredEvents.length === 0 && filteredNotes.length === 0 && filteredEmails.length === 0 && isShowClass){
        setShowClass (false);
    } else if ((filteredConnections.length > 0 || filteredEvents.length > 0 || filteredNotes.length > 0 || filteredEmails.length > 0) && !isShowClass){
        setShowClass (true);
    } 
    return (
        
        <div className={isShowClass ? "search-result" : "visually-hidden" }>
            <div className="search-filter-btns">
                <button className={`btn ${activeBtn === "all" ? 'btn-primary' : 'btn-primary-reverse'}`} onClick={AllSearchFilter}>All</button>
                <button className={`btn ${activeBtn === "connection" ? 'btn-primary' : 'btn-primary-reverse'}`} onClick={ConnectionSearchFilter}>Connection</button>
                <button className={`btn ${activeBtn === "email" ? 'btn-primary' : 'btn-primary-reverse'}`} onClick={EmailSearchFilter}>Email</button>
                <button className={`btn ${activeBtn === "note" ? 'btn-primary' : 'btn-primary-reverse'}`} onClick={NoteSearchFilter}>Note</button>
                <button className={`btn ${activeBtn === "event" ? 'btn-primary' : 'btn-primary-reverse'}`} onClick={EventSearchFilter}>Event</button>
            </div>
        {currentAllResults.map((item)=> {
            if(item.class === "connection"){
                return <ConnSearchResult key={item._id} connection={item} onToggleConn={onToggleConn}/>
            }
            else if(item.class === "event"){
                return <EveSearchResult key={item._id} event={item} onToggle={onToggleEvent}/>
            }
            else if(item.class === "note"){
                return <NotesSearchResult key={item._id} note={item} onToggleNote={onToggleNote}/>
            }
            else if(item.class === "email"){
                return <EmailSearchResult key={item._id} email={item} />
            }
        })
        }
        </div>

    )
}

export default SearchResults