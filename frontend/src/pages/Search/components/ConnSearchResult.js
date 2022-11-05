

const ConnSearchResult = ({ connection, onToggleConn }) => {
    return (
      <div className="search-single" onClick = {() => onToggleConn(connection._id)}>
        <div >
        <h3>
        {connection.firstname}{' '}
        {connection.lastname}{' '}
        </h3>
        </div>
        <div className="search-type-button-wrapper"><button className="search-type-button">Connection</button></div>
  
      </div>
    );
  };
  
  export default ConnSearchResult;