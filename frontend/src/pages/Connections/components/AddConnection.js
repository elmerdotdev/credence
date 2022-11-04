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
  const [location, setLocation] = useState('');
  const [active, setActive] = useState(false);
  const [labels, setLabels] = useState( [
    { text: "Technology", select: false },
    { text: "Hospitality", select: false },
    { text: "Finance", select: false },
    { text: "Retail", select: false },
    { text: "Art & Design", select: false },
    { text: "Manufacturing", select: false },
    { text: "Media", select: false }
  ]);
  const [user_id, setUserId] = useState('633b6a81145c9d79405c54ea');
  const [pinned, setPinned] = useState(false);

const checkboxes = [
  { text: "Technology" },
  { text: "Hospitality" },
  { text: "Finance" },
  { text: "Retail" },
  { text: "Art & Design" },
  { text: "Manufacturing" },
  { text: "Media" }
];


const onSubmit = (e) => {
  e.preventDefault();

  onAdd({ firstname, lastname, company, position, email, phone, active, location, user_id, labels, pinned });
  console.log("industry: ", labels);
  setFirstname('');
  setLastname('');
  setPosition('');
  setCompany('');
  setEmail('');
  setPhone('');
  setLocation('');
  setActive(false);
  setLabels([ 
  { text: "Technology", select: false },
  { text: "Hospitality", select: false },
  { text: "Finance", select: false },
  { text: "Retail", select: false },
  { text: "Art & Design", select: false },
  { text: "Manufacturing", select: false },
  { text: "Media", select: false }]);
};


  return (
    <div>
    <h2 className="modal-title">New Connection</h2>
   
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>First Name / Nickname*</label>
        <input
          required
          className="form-input"
          type="text"
          placeholder="Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name*</label>
        <input
          required
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <h4>Contact Information</h4>
      <div className="form-control">
        <label>Email*</label>
        <input
          required
          type="text"
          placeholder="connection@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Phone Number*</label>
        <input
          required
          type="text"
          placeholder="(000)000-000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h4>Work</h4>
      <div className="form-control">
        <label>Organization</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label> Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <span >Active Client</span>
        <label htmlFor="activeChkbox" className="switch">Active
        <input
          id="activeChkbox"
          type="checkbox"
          checked={active}
          value={active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
        <span className="slider round"></span>
        </label>
      </div>
      <div className="IndustryChkbox-wrapper">
        {checkboxes.map(({text}, index) => {
          return (
          <div key={index}>
          <div className="industry-item">
            <input
              className="industry-item-input"
              type="checkbox"
              id={`industry-checkbox-${index}`}
              name={text}
              value={text}
              onChange={(e) => {const currSelection = labels; currSelection[index].select = e.currentTarget.checked; setLabels(currSelection)}}
            />
              <label className="industry-item-label" htmlFor={`industry-checkbox-${index}`}>{text}</label>
          </div>
        </div>
        )  
        })}
      </div>

      <input type="submit" value="Save Connection" className="btn btn-block" />
    </form>
  

    </div>
  )
}


export default AddConnection