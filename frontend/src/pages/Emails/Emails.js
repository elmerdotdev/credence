import React from 'react'
import { useEffect, useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';
import EmailDetails from './components/EmailDetails'

const Emails = ( {connection} ) => {
  const [emails, setEmails] = useState(null)
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

      if (response.ok) {
          return data
      }
    }


 
  return (
    <section>

      <div className="emails">
      <EmailDetails
          emails = {emails}
          connection = {connection}
        />
      </div>
    </section>
  )
}

export default Emails