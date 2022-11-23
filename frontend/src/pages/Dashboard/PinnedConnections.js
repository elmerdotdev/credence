import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const PinnedConnections = ({ connection, onToggle, fetchEmails }) => {

  const [days, setDays] = useState(0)

  useEffect(() => {
    const getEmails = async () => {
      const res = await fetchEmails(connection._id)

      if (res.length > 0) {
        const today = moment(moment().valueOf())
        const emailDate = moment(res[res.length - 1].emailTime, 'x')

        console.log(today.diff(emailDate, 'days'))
      }
    }

    getEmails()
  }, [connection, fetchEmails])

  return (
        <div className="client-card" onClick={() => onToggle(connection._id)}>
          <div className="connection-details">
              <div className="connection-details-photo">
                  <img src={connection.photo} alt={connection.firstname} />
              </div>
              <div className="connection-details-text">
                  <h4>{connection.firstname} {connection.lastname}</h4>
                  <p className="connection-position">{connection.position}</p>
                  <p className="connection-company">{connection.company}</p>
              </div>
          </div>
          <div className="connection-interaction">Last interaction: <strong>0 days ago</strong></div>
        </div>
  )
}

export default PinnedConnections