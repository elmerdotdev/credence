//完善表格： 添加client照片、职位、地点等

import React from 'react';
import { useState } from 'react';

const AddConnection = ({ onAdd }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [user_id, setUserId] = useState('633e29fe0f75b027fc7434e8');
//   const [modalIsOpen, setIsOpen] = React.useState(false);


const onSubmit = (e) => {
  e.preventDefault();

  onAdd({ firstname, lastname, company, title, email, phone, active, user_id});

  setFirstname('');
  setLastname('');
  setTitle('');
  setCompany('');
  setEmail('');
  setPhone('');
  setActive(false);
};

  //Close Modal 
//   const closeModal = () => {
//     setIsOpen(false);
//   }

  return (
    <div>
    <h3 className="modal-title">New Connection</h3>
   
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="activeChkbox">Active</label>
        <input
          id="activeChkbox"
          type="checkbox"
          checked={active}
          value={active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Client" className="btn btn-block" />
    </form>
  

    </div>
  )
}


export default AddConnection