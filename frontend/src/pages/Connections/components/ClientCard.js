import { useState, useEffect } from 'react';

const ClientCard = ({ connection, onToggle}) => {

  const [days, setDays] = useState(0)

  const userID = JSON.parse(localStorage.getItem('user'))._id

  useEffect(
    () => {
    const getEmails = async () => {
      const res = await fetchEmails();
      if(res.length>0) {
      let utcSeconds = res[res.length-1].emailTime/1000;
      let d = new Date(0); 
      d.setUTCSeconds(utcSeconds)
      let timedifference = (new Date()).getTime() - d;
      setDays(Math.ceil((((timedifference / 1000) / 60) / 60) / 24))
  }};
    getEmails()

  }, []
  )

   //Fetch All Emails For Client
   const fetchEmails = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gmails/${userID}/${connection._id}`)
    const data = await response.json()
        return data
  }



    return (
      <div className="client-card" onClick = {() => onToggle(connection._id)}>
        <div>
          <div>
            <img src={connection.photo} alt={connection.firstname} />
          </div>
          <h4>{connection.firstname}{' '} {connection.lastname}{' '}</h4>
          <p className="connection-position">{connection.position}</p>
          <p className="connection-company">{connection.company}</p>
        </div>

        <div className="connection-interaction">Last interaction: <strong>{days} days ago</strong></div>
      </div>
    );
  };
  
  export default ClientCard;