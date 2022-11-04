import { useState } from 'react';

const EditConnection = ({ onEdit, connection }) => {
  // const [connection, setConnection] = useState({});
  const [firstname, setFirstname] = useState(connection.firstname);
  const [lastname, setLastname] = useState(connection.lastname);
  const [position, setPosition] = useState(connection.position);
  const [company, setCompany] = useState(connection.company);
  const [email, setEmail] = useState(connection.email);
  const [phone, setPhone] = useState(connection.phone);
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
  const [user_id, setUserId] = useState('633b6a81145c9d79405c54ea');

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


    onEdit({firstname, lastname, company, position, email, phone, active, labels, user_id});

    

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
          defaultValue={connection.firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          defaultValue={connection.lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <h4>Contact Information</h4>
      <div className="form-control">
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          defaultValue={connection.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Phone"
          defaultValue={connection.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h4>Work</h4>
      <div className="form-control">
        <label>Organization</label>
        <input
          type="text"
          placeholder="Organization"
          defaultValue={connection.company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          defaultValue={connection.position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="activeChkbox">Active</label>
        <input
          id="activeChkbox"
          type="checkbox"
          checked={active}
          defaultValue={connection.active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
      </div>
      <div className="IndustryChkbox">
        {checkboxes.map(({text}, index) => {
          return (
          <div key={index}>
          <div className="industry-item">
              <input
                type="checkbox"
                id={`industry-checkbox-${index}`}
                name={text}
                defaultValue={text}
                onChange={(e) => {const currSelection = labels; currSelection[index].select = e.currentTarget.checked; setLabels(currSelection)}}

              />
              <label htmlFor={`custom-checkbox-${index}`}>{text}</label>
          </div>
        </div>
        )  
        })}
         </div>

      <input type="submit" value="Update" className="btn btn-block" />
    </form>
  

    </div>
  );
};

export default EditConnection;
