import Notes from '../../Notes/Notes';

const ConnectionDetail = ({connection, onEditBtn, onDeleteBtn, onPinBtn, changeActiveBtn, onClose}) => {

  return (
    <div>
    <div className="modal-connection-detail-top">
      <div>
          <div className="modal-connection-detail-header">
            <div>
              <i className="icon-close" onClick={() => onClose(false)}></i>
            </div>
            <div className="modal-button-controls">
              <button className={`btn ${connection.pinned ? 'btn-focus-reverse' : 'btn-primary-reverse'}`} onClick={onPinBtn}><span>{connection.pinned ?  "Pinned" : "Pin"}</span> <i className="icon-pin"></i></button>
              <button className="btn btn-primary-reverse" onClick={onEditBtn}><span>Edit</span> <i className="icon-edit"></i></button>
              <button className="btn btn-primary-reverse" onClick={onDeleteBtn}><span>Delete</span> <i className="icon-trash"></i></button>
            </div>
          </div>
            <div className="modal-connection-detail-content detail-info">
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
                <p className="regular-text-gray">Email</p>
                <p>{connection && connection.email}</p>
              </div>
              <div>
                <p className="regular-text-gray">Phone</p>
                <p>{connection && connection.phone}</p>
              </div>
              <div>
                <p className="regular-text-gray">Active Client</p>
                <label className="switch">
                  <input type="checkbox" checked={connection.active} onChange={changeActiveBtn} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div>
                <p className="regular-text-gray">Industry</p>
                <div className="detail-info-industry">
                  {connection.labels.map((label, index) => {
                    if (label.select) {
                      
                    return(
                      <span key={index}>
                        {label.text}
                      </span>
                    )}
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-connection-detail-bottom">
          <div className="modal-connection-detail-content">
            <h3>Notes</h3>
            <Notes 
              connection = {connection}
            />
          </div>
        </div>
  </div>
    )
};


export default ConnectionDetail;