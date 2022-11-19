import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";

import ClientCards from '../Connections/components/ClientCards';
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
  const onConnectionClick = (element) => {
    navigate('/connections')
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
          {connections.filter((connection) => connection.pinned) &&
            <>
              <div className="dashboard-connection-header">
                <h3>Pinned Connections</h3>
                <Link to="/connections">View All</Link>
              </div>
              <div className="dashboard-connection-content">
                <ClientCards connections={connections.filter((connection) => connection.pinned)} onToggle={() => onConnectionClick} />
              </div>
            </>
          }          
          <>
            <div className="dashboard-connection-header">
              <h3>Most Recent</h3>
              <Link to="/connections">View All</Link>
            </div>
            <div className="dashboard-connection-content">
              <ClientCards connections={connections.slice(0,3)} onToggle={() => onConnectionClick} />
            </div>
          </>
        </div>

        <div className="dashboard-upcoming">
          <EventsWidget events={events} currMonth={currentMonth} firstDay={monthFirstDay} lastDay={monthLastDay} onEventClick={handleEventClick} fetchClient={fetchClient} />
        </div>
      </div>
    </section>
  )
}

export default Dashboard