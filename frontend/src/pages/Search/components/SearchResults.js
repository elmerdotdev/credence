import SearchResult from './SearchResult'

const SearchResults = ({ filteredConnections }) => {
    return (
       
        <div className="search-result">
        {filteredConnections.map((connection) => (
            <SearchResult key={connection._id} connection={connection} />
        ))}
        </div>

    )
}

export default SearchResults