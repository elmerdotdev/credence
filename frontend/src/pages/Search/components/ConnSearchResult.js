

const ConnSearchResult = ({ connection, onToggleConn }) => {
    return (
      <div className="search-single" onClick = {() => onToggleConn(connection._id)}>
        {connection.photo ?
          <div className="connection-result connection-with-photo">
            <div className="connection-result-photo-wrapper">
              <img src={connection.photo} alt={connection.firstname} />
            </div>
            <h3>
              {connection.firstname}{' '}
              {connection.lastname}{' '}
            </h3>
          </div>
        :
          <div className="connection-result">
            <h3>
              {connection.firstname}{' '}
              {connection.lastname}{' '}
            </h3>
          </div>
        }
        <div className="search-type-button-wrapper"><button className="search-type-button">Connection</button></div>
  
      </div>
    );
  };
  
  export default ConnSearchResult;