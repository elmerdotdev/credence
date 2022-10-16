const ClientCard = ({ connection }) => {
    return (
      <div>
        <h3>
        {connection.firstname}{' '}
        {connection.lastname}{' '}
        </h3>
        <p>{connection.phone}</p>
        <p>{connection.email}</p>
        <p>{connection.active}</p>
  
      </div>
    );
  };
  
  export default ClientCard;