import Notes from '../../Notes/Notes';

const ConnectionDetail = ({connection, onEditBtn, onDeleteBtn, onPinBtn, changeActiveBtn}) => {

  return (
    <div>
      <div>
          <button onClick={onPinBtn}><span>{connection.pinned ?  "Pinned" : "Pin"}</span><i className="icon-pin"></i></button>
          <button onClick={onEditBtn}><span>Edit</span><i className="icon-edit"></i></button>
          <button onClick={onDeleteBtn}><span>Delete</span><i className="icon-trash"></i></button>
              <div>
                <h2>
                  {connection && connection.firstname}{' '}
                  {connection && connection.lastname}{' '}
                </h2>
                <div>
                  <p className="regular-text-gray">Position</p>
                  <p>{connection && connection.position}</p>
                </div>
                <div>
                  <p className="regular-text-gray">Organization</p>
                  <p>{connection && connection.company}</p>
                </div>
                <div>
                  <p className="regular-text-gray">Location</p>
                  <p>{connection && connection.location}</p>
                </div>
                <div>
                  <p className="regular-text-gray">Email</p>
                  <p>{connection && connection.email}</p>
                </div>
                <div>
                  <p className="regular-text-gray">Active Client</p>
                  <label className="switch">
                  <input type="checkbox" checked={connection.active} onChange={changeActiveBtn} />
                  <span className="slider round"></span>
                </label>
                <div>
                <div>
                  <p className="regular-text-gray">Industry</p> 
                  {connection.labels.map((label, index) => {
                    if (label.select) {
                      
                    return(
                        <div key={index}>
                          {label.text}
                        </div>

                        
                        )}
                      })}
                </div>
              </div>
            </div>
        </div>
      </div>
      <div>
      <Notes />
      </div>
  </div>
    )
};


export default ConnectionDetail;