import ConnSearchResult from './ConnSearchResult';
import EveSearchResult from './EveSearchResult';

const SearchResults = ({ filteredConnections, filteredEvents }) => {
    return (
       
        <div className="search-result">
        {filteredConnections.map((connection) => (
            <ConnSearchResult key={connection._id} connection={connection} />
        ))}
        {filteredEvents.map((event) => (
            <EveSearchResult key={event._id} event={event} />
        ))}
        </div>

    )
}

export default SearchResults