import { useState, useEffect } from 'react';

const ClientCard = ({ connection, onToggle}) => {
  const [interaction, setInteraction] = useState("")
  const [days, setDays] = useState(0)

  const userID = JSON.parse(localStorage.getItem('user'))._id

  useEffect(
    () => {
    const getEmails = async () => {
      let emails = []
      let days = -1
      const res = await fetchEmails();
      if(res.length>0) {
      emails = res
      let utcSeconds = res[res.length-1].emailTime/1000;
      let d = new Date(0); 
      d.setUTCSeconds(utcSeconds)
      let timedifference = (new Date()).getTime() - d;
      days = Math.ceil((((timedifference / 1000) / 60) / 60) / 24)
      setDays(days)
      
  }
   //Last Interaction content
   if (emails.length > 0)  {
     if (days>0){setInteraction(`${days} days ago`)}
     else if (days=0){setInteraction("today")} }
    //  else {  setInteraction("no previous interaction")}
};
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
        <div className="connection-details">
          <div className="connection-details-photo">
            <img src={connection.photo} alt={connection.firstname} />
          </div>
          <div className="connection-details-text">
            <h4>{connection.firstname}{' '} {connection.lastname}{' '}</h4>
            <p className="connection-position">{connection.position}</p>
            <p className="connection-company">{connection.company}</p>
          </div>
        </div>
        <div className="connection-interaction">
            {days > 0 ?
              <span>Last interaction: <strong>{days} days ago</strong></span>
            :
              <em>No previous interaction</em>
            }
          </div>

      </div>
    );
  };
  
  export default ClientCard;