import Notes from '../../Notes/Notes';
import { useState } from 'react';

const ConnectionDetail = ({connection, onEditBtn, onDeleteBtn, onPinBtn, changeActiveBtn}) => {



  return (
    <div>
      <div>
      <button onClick={onPinBtn}><span>Pin</span><i className="icon-pin"></i></button>
      <button onClick={onEditBtn}><span>Edit</span><i className="icon-edit"></i></button>
      <button onClick={onDeleteBtn}><span>Delete</span><i className="icon-trash"></i></button>
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
        <div>
        <h5>Active Client</h5>

        <label className="switch">
        <input type="checkbox" checked={connection.active} onChange={changeActiveBtn} />
        <span className="slider round"></span>
        </label>

        <p></p>
        </div>
      </div>
      <div>
      <Notes />
      </div>
  </div>
    )
};


export default ConnectionDetail;