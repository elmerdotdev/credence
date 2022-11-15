
const ClientCard = ({ connection, onToggle }) => {

    return (
      <div className="client-card" onClick = {() => onToggle(connection._id)}>
        <div>
          <div>
            <img src={connection.photo} alt={connection.firstname} />
          </div>
          <h4>{connection.firstname}{' '} {connection.lastname}{' '}</h4>
          <p className="connection-position">{connection.position}</p>
          <p className="connection-company">{connection.company}</p>
        </div>

        <div className="connection-interaction">Last interaction: <strong>2 days ago</strong></div>
      </div>
    );
  };
  
  export default ClientCard;