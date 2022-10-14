// insert一个新的client进database
import React from 'react';
import { useState } from 'react'

const Connections = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [user_id, setUserId] = useState('');


const addClient = async (newClient) => {
  
  const res = await fetch('http://localhost:5002/api/clients', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newClient),
  });

  const data = await res.json();
};
const deleteClient = async () => {
  // const addClient = async (task) => {

  const res = await fetch('http://localhost:5002/api/clients/6348a9d86a8ff1e1f8253d67', {
    method: 'DELETE',
  });

  const data = await res.json();
};

const onSubmit = (e) => {
  e.preventDefault();

  addClient({ firstname, lastname, email, phone, active, user_id });

  setFirstname('');
  setLastname('');
  setEmail('');
  setPhone('');
  setActive(false);
  setUserId('')
};

  return (
    <div>
    <section className="page-connections">Connections</section>
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
      <div className="form-control">
        <label></label>
        <input
          type="text"
          placeholder="UserId"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <input type="submit" value="Save Client" className="btn btn-block" />
    </form>
  
    <button onClick = {deleteClient}>del</button>

    </div>
  )
}

export default Connections