import React from 'react';
import { useState } from 'react';

const AddConnection = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [user_id, setUserId] = useState('633e29fe0f75b027fc7434e8');
//   const [modalIsOpen, setIsOpen] = React.useState(false);


  // Add Connection
const addConnection = async (newClient) => {
    const res = await fetch('http://localhost:5002/api/clients', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });
  
    const data = await res.json();
  };

const onSubmit = (e) => {
  e.preventDefault();

  addConnection({ firstname, lastname, email, phone, active, user_id});

  setFirstname('');
  setLastname('');
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