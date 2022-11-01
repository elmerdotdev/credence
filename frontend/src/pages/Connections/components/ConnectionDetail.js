import Notes from '../../Notes/Notes';

const ConnectionDetail = ({connection, onEditBtn, onDeleteBtn}) => {



  return (
    <div>
      <div>
      <button>Pin</button>
      <button onClick={onEditBtn}>Edit</button>
      <button onClick={onDeleteBtn}>Delete</button>
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
      <div>
      <Notes />
      </div>
  </div>
    )
};


export default ConnectionDetail;