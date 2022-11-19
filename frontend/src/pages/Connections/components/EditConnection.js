import { useState } from 'react';

const EditConnection = ({ onEdit, connection, onClose }) => {
  // const [connection, setConnection] = useState({});
  const [firstname, setFirstname] = useState(connection.firstname);
  const [lastname, setLastname] = useState(connection.lastname);
  const [position, setPosition] = useState(connection.position);
  const [company, setCompany] = useState(connection.company);
  const [email, setEmail] = useState(connection.email);
  const [phone, setPhone] = useState(connection.phone);
  const [location, setLocation] = useState(connection.location);
  const [active, setActive] = useState(connection.active);
  const [labels, setLabels] = useState( [
    { text: "Technology", select: false },
    { text: "Hospitality", select: false },
    { text: "Finance", select: false },
    { text: "Retail", select: false },
    { text: "Art & Design", select: false },
    { text: "Manufacturing", select: false },
    { text: "Media", select: false }
  ]);
  const [user_id, setUserId] = useState('63645e4850049bfd1e89637a');

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


    onEdit({firstname, lastname, company, position, email, phone, location, active, labels, user_id});

    

  };

  return (
    <div>
    <h2 className="modal-title">Edit Connection</h2>
   
    <form className="edit-form" onSubmit={onSubmit}>
      <div className="input-wrapper">
        <label>First Name / Nickname*</label>
        <input
          required
          type="text"
          placeholder="First name"
          defaultValue={connection.firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label>Last Name*</label>
        <input
          required
          type="text"
          placeholder="Last name"
          defaultValue={connection.lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <h4>Contact Information</h4>
      <div className="input-wrapper">
        <label>Email*</label>
        <input
          required
          type="text"
          placeholder="Email"
          defaultValue={connection.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label>Phone Number*</label>
        <input
          required
          type="text"
          placeholder="Phone"
          defaultValue={connection.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h4>Work</h4>
      <div className="input-wrapper">
        <label>Organization</label>
        <input
          type="text"
          placeholder="Organization"
          defaultValue={connection.company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          defaultValue={connection.position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label> Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <span className="slider-label-span">Active Client</span>
        <label htmlFor="activeChkbox" className="switch">
        <input
          id="activeChkbox"
          type="checkbox"
          checked={active}
          defaultValue={connection.active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
        <span className="slider round"></span>
        </label>
      </div>
      <div className="input-wrapper">
        <label>Industry</label>
        <div className="industry-checkboxes">
        {checkboxes.map(({text}, index) => {
          return (
          <div key={index}>
          <div className="industry-item">
              <input
                className="industry-item-input"
                type="checkbox"
                id={`industry-checkbox-${index}`}
                name={text}
                defaultValue={text}
                onChange={(e) => {const currSelection = labels; currSelection[index].select = e.currentTarget.checked; setLabels(currSelection)}}

              />
              <label htmlFor={`industry-checkbox-${index}` } className="industry-item-label">{text}</label>
          </div>
        </div>
        )  
        })}
        </div>
      </div>

      <div className="input-wrapper submit-btn-wrapper">
        <button className="btn btn-primary-reverse" onClick={() => onClose(false)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Update Connection</button>
      </div>
    </form>
  

    </div>
  );
};

export default EditConnection;
