const ClientCard = ({ firstname, lastname, phone, email, active }) => {
    return (
      <div>
        <h3>
        {firstname}{' '}
        {lastname}{' '}
        </h3>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{active}</p>
  
      </div>
    );
  };
  
  export default ClientCard;