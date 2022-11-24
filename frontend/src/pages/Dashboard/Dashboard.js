import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";

import PinnedConnections from './PinnedConnections';
import EventsWidget from '../Calendar/components/EventsWidget';

const Dashboard = () => {
  const currentMonth = moment().format('MMMM YYYY')
  const monthFirstDay = moment().startOf('month').format('YYYY-MM-DD')
  const monthLastDay = moment().endOf('month').format('YYYY-MM-DD')

  const navigate = useNavigate()

  const [userID, setUserID] = useState('')
  const [connections, setConnections] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login')
    } else {
      setUserID(JSON.parse(localStorage.getItem('user'))._id)

      document.body.classList.remove('no-sidebar')
  
      const getConnections = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${JSON.parse(localStorage.getItem('user'))._id}`)
        const data = await res.json()
  
        setConnections(data)
      }
  
      getConnections()
  
      const getActivities = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${JSON.parse(localStorage.getItem('user'))._id}`)
        const data = await res.json()
  
        setEvents(data)
      }
  
      getActivities()
    }
  }, [navigate, userID])

  // Get client
  const fetchClient = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`)
    const data = await res.json()

    return data
  }

  // On Event Click
  const handleEventClick = (element) => {
    navigate('/calendar')
  }

  // On Event Click
  const onConnectionClick = (connectionId) => {
    navigate(`/connections/?connectionId=${connectionId}`)
  }

  //Fetch All Emails For Client
  const fetchEmails = async (connectionId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gmails/${userID}/${connectionId}`)
    const data = await response.json()
    
    return data
  }

  return (
    <section className="page-dashboard">
      <ul className="dashboard-tabs">
        <li>
          <button>Connection</button>
        </li>
        <li>
          <button>Upcoming</button>
        </li>
      </ul>

      <div className="dashboard-wrapper">
        <div className="dashboard-connection">
          <h2>Connections</h2>
          <div className="dashboard-connection-wrapper">
            {connections.filter((connection) => connection.pinned) &&
              <>
                <div className="dashboard-connection-header">
                  <h3>Pinned Connections</h3>
                  <Link to="/connections">View All</Link>
                </div>
                <div className="dashboard-connection-content">
                  {connections.filter((connection) => connection.pinned).slice(0, 3).map((connection, i) => {
                    return (
                      <PinnedConnections key={i} connection={connection} fetchEmails={fetchEmails} onToggle={onConnectionClick} />
                    )
                  })}
                </div>
              </>
            }
            <>
              <div className="dashboard-connection-header">
                <h3>Most Recent</h3>
                <Link to="/connections">View All</Link>
              </div>
              <div className="dashboard-connection-content">
                {connections.slice(0, 3).map((connection, i) => {
                  return (
                    <PinnedConnections key={i} connection={connection} fetchEmails={fetchEmails} onToggle={onConnectionClick} />
                  )
                })}
              </div>
            </>
          </div>
        </div>

        <div className="dashboard-upcoming">
          <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} onEventClick={handleEventClick} fetchClient={fetchClient} />
        </div>
      </div>
    </section>
  )
}

export default Dashboard