


const ConnectionDetail = ({connection, onEdit}) => {



  return (
    <div>
      <div>
      <button>Pin</button>
      <button onClick={() => onEdit(connection)}>Edit</button>
      <button>Delete</button>
        <h3>
        {connection && connection.firstname}{' '}
        {connection && connection.lastname}{' '}
        </h3>
        <div>
        <h5>Position</h5>
        <p>{connection && connection.position}</p>
        </div>
        <div>
        <h5>Organization</h5>
        <p>{connection && connection.company}</p>
        </div>
        <div>
        <h5>Email</h5>
        <p>{connection && connection.email}</p>
        </div>
      </div>
  </div>
    )
};


export default ConnectionDetail;