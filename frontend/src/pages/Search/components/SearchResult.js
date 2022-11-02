

const SearchResult = ({ connection }) => {
    return (
      <div >
        <div>
        <h3>
        {connection.firstname}{' '}
        {connection.lastname}{' '}
        </h3>
        </div>
        <p>Connection</p>
  
      </div>
    );
  };
  
  export default SearchResult;