import React from 'react';
import { useState } from 'react'

const AddConnection = ( { addClient }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [user_id, setUserId] = useState('633e29fe0f75b027fc7434e8');


const onSubmit = (e) => {
  e.preventDefault();

  addClient({ firstname, lastname, email, phone, active, user_id});

  setFirstname('');
  setLastname('');
  setEmail('');
  setPhone('');
  setActive(false);
};

  return (
    <div>
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