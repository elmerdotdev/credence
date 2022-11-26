import React from 'react'
import { useEffect, useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';
import EmailDetails from './components/EmailDetails'

const Emails = ( {connection, gmailIntegration, gmailUpdate} ) => {
  const [emails, setEmails] = useState([])
  const [connectionId, setConnectionId ] = useState(connection._id)
//   const [currParams, setCurrParams] = useState('');

const userID = JSON.parse(localStorage.getItem('user'))._id

//   const navigate = useNavigate()
//   const location = useLocation()

  useEffect(
    () => {
    const getEmails = async () => {
      const res = await fetchEmails();
      setEmails(res);
  };
    getEmails()
  }, []
  )

    //Fetch All Emails For Client
  const fetchEmails = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gmails/${userID}/${connectionId}`)
      const data = await response.json()
      console.log(data)
          return data
  
    }

    


 
  return (
    <section>

      <div className="emails">
      {emails.length > 0 ? (
        <div><button className="btn btn-primary-reverse"onClick={gmailUpdate}>Update Gmail</button>
         <EmailDetails
         emails = {emails}
         connection = {connection}
       />
       </div>
         ) : (
         <div>
          <p>You have no previous gmail interaction with {connection.firstname}</p>
          {/* <p className="error-message">
              <button className="btn btn-primary-reverse" onClick={gmailIntegration}>Connect Gmail</button>
          </p> */}
          </div>
          )}   
     
      </div>
    </section>
  )
}

export default Emails