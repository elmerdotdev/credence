//完善表格： 添加client照片、职位、地点等

import React from 'react';
import { useState } from 'react';

const AddConnection = ({ onAdd }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [industry, setIndustry] = useState([]);
  const [user_id, setUserId] = useState('633b6a81145c9d79405c54ea');
  const [pinned, setPinned] = useState(false);
//   const [modalIsOpen, setIsOpen] = React.useState(false);


const onSubmit = (e) => {
  e.preventDefault();

  onAdd({ firstname, lastname, company, position, email, phone, active, user_id, industry, pinned});

  setFirstname('');
  setLastname('');
  setPosition('');
  setCompany('');
  setEmail('');
  setPhone('');
  setActive(false);
  setIndustry([]);
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
        <label>First Name / Nickname</label>
        <input
          type="text"
          placeholder="First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <h4>Contact Information</h4>
      <div className="form-control">
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h4>Work</h4>
      <div className="form-control">
        <label>Organization</label>
        <input
          type="text"
          placeholder="Organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
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


      <input type="submit" value="Save Connection" className="btn btn-block" />
    </form>
  

    </div>
  )
}


export default AddConnection