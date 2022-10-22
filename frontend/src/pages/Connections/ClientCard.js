const ClientCard = ({ connection, onToggle }) => {
    return (
      <div onClick = {() => onToggle(connection._id)}>
        <h3>
        {connection.firstname}{' '}
        {connection.lastname}{' '}
        </h3>
        <p>{connection.position}</p>
        <p>{connection.company}</p>
        <p>{connection.active}</p>
  
      </div>
    );
  };
  
  export default ClientCard;