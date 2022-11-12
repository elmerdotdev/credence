import ConnSearchResult from './ConnSearchResult';
import EveSearchResult from './EveSearchResult';
import NotesSearchResult from './NotesSearchResult';
import { useState } from "react";

const SearchResults = ({ filteredConnections, filteredEvents, filteredNotes, onToggleEvent, onToggleConn, onToggleNote, sortedAllResults }) => {
    const [isShowClass, setShowClass] = useState(true);
 
    if (filteredConnections.length == 0 && filteredEvents.length == 0 && filteredNotes.length == 0 && isShowClass){
        setShowClass (false);
    } else if ((filteredConnections.length > 0 || filteredEvents.length > 0 || filteredNotes.length > 0 ) && !isShowClass){
        setShowClass (true);
    } 
    return (
        
        <div className={isShowClass ? "search-result" : "visually-hidden" }>
        {sortedAllResults.map((item)=> {
            if(item.class == "connection"){
                // console.log(item._id)
                return <ConnSearchResult key={item._id} connection={item} onToggleConn={onToggleConn}/>
            }
            else if(item.class == "event"){
                return <EveSearchResult key={item._id} event={item} onToggle={onToggleEvent}/>
            }
            else if(item.class == "note"){
                return <NotesSearchResult key={item._id} note={item} onToggleNote={onToggleNote}/>
            }
        })
        }
        </div>

    )
}

export default SearchResults