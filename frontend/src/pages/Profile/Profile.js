import React, { useEffect, useState } from 'react'
//Icon 
import '../../fontello/css/credence.css';

const Profile = () => {
  const [ myClients, setMyClients ] = useState('')
  const [ myEvents, setMyEvents ] = useState('')
  const [ myNotes, setMyNotes ] = useState('')
  const [ myImg, setMyImg ] = useState('')

  //get userID from Localstorage(user ID)
  const userID = localStorage.getItem('user')
  console.log(userID)

  //1.Clients number
  useEffect(() => {
    const getClients = async () => {
      const res = await fetchMyConnections()
      const myList = res.filter((client) => client.user_id === userID)
      setMyClients(myList.length)
    }

    getClients();
  },[])

  const fetchMyConnections = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`);
    const data = await res.json();  

    if(res.ok) {
      return data 
    }
  }

  //2.Events number
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetchMyEvents()
      const mySchedule = res.filter((activity) => activity.user_id === userID)
      setMyEvents(mySchedule.length)
    }

    getEvents();
  },[])

  const fetchMyEvents = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`);
    const data = await res.json();      
    
    if(res.ok) {
      return data 
    }
  }


  //3.Notes number
  useEffect(() => {
    const getNotes = async () => {
      const res = await fetchMyNotes()
      const myMemo = res.filter((note) => note.user_id === userID)
      setMyNotes(myMemo.length)
    }

    getNotes();
  },[])

  const fetchMyNotes = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${userID}`);
    const data = await res.json();  

    if(res.ok) {
      return data 
    }
  }
 

  // 4.User Image
   useEffect(() => {
    const getImg = async () => {
      const res = await fetchMyImg()
      setMyImg(res.photo)
    }

    getImg();
  },[])
  
  const fetchMyImg = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userID}`);
    const data = await res.json();  
   
    if(res.ok) {
      return data 
    }
  }


  return (
    <>
      <div className="page-profile">
        <section className="page-profile-edit">
          <div className="my-profile-box">
            
            <img src={ myImg } alt="user-img" />
            
            <div className='connection-box'>
              <i className='icon-connection'></i>
              <p>{ myClients }</p>
              <p>connections</p>
            </div>
            <div className="event-box">
              <i className='icon-calendar'></i>
              <p>{ myEvents }</p>
              <p>events</p>
            </div>
            <div className="note-box">
              <i className='icon-note'></i>
              <p>{ myNotes }</p>
              <p>notes</p>
            </div>
          </div>

            <button className="edit-profile-btn">Edit Profile</button>
        </section>
        
        <section className="page-profile-passwordSecurity">
          <h4>Password & Security</h4>
          <p>Manage your info, privacy and security to make Credence work better for you.</p>

          <button>Manage</button>
        </section>
        
        <section className="page-profile-subscription">
          <h4>Subscription</h4>
          <p>You are currenty on our <span>30-day trial.</span>Go Premium to enjoy our most-loved premium features.</p>

          <button>Go Premium</button>
        </section>
      </div>
    </>
  )
}

export default Profile
