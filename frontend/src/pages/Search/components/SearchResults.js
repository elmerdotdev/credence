import ConnSearchResult from './ConnSearchResult';
import EveSearchResult from './EveSearchResult';
import { useState } from "react";

const SearchResults = ({ filteredConnections, filteredEvents, onToggle }) => {
    const [isShowClass, setShowClass] = useState(true);
 
    if (filteredConnections.length == 0 && filteredEvents.length == 0 && isShowClass){
        setShowClass (false);
    } else if ((filteredConnections.length > 0 || filteredEvents.length > 0) && !isShowClass){
        setShowClass (true);
    } 
    return (
        
        <div className={isShowClass ? "search-result" : "visually-hidden" }>
        {filteredConnections.map((connection) => (
            <ConnSearchResult key={connection._id} connection={connection} />
        ))}
        {filteredEvents.map((event) => (
            <EveSearchResult key={event._id} event={event} onToggle={onToggle(event._id)}/>
        ))}
        </div>

    )
}

export default SearchResults