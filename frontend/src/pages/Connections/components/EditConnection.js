import { useState } from 'react';

const EditConnection = ({ onEdit }) => {
  // const [connection, setConnection] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);
  const [user_id, setUserId] = useState('633b6a81145c9d79405c54ea');



  const onSubmit = (e) => {
    e.preventDefault();


    onEdit({firstname, lastname, company, position, email, phone, active, user_id});

    

  };

  return (
    <div>
    <h3 className="modal-title">Edit Connection</h3>
   
    <form className="edit-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>First Name / Nickname</label>
        <input
          type="text"
          placeholder="First name"
          defaultValue={firstname}
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

      <input type="submit" value="Update" className="btn btn-block" />
    </form>
  

    </div>
  );
};

export default EditConnection;
