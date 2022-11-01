
const ClientCard = ({ connection, onToggle }) => {
    return (
      <div className="client-card" onClick = {() => onToggle(connection._id)}>
        <div>
        <h3>
        {connection.firstname}{' '}
        {connection.lastname}{' '}
        </h3>
        <p>{connection.position}</p>
        <p>{connection.company}</p>
        <p>{connection.active}</p>
        </div>
        <p>Last interaction: 2 days ago</p>
  
      </div>
    );
  };
  
  export default ClientCard;