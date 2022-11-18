import React, { useEffect, useState } from 'react'
import Modal from "react-modal"
//Icon 
import '../../fontello/css/credence.css';
import EditProfile from './EditProfile';
import SelectPlan from './SelectPlan';

const AccountSettings = () => {
  const [ myClients, setMyClients ] = useState('')
  const [ myEvents, setMyEvents ] = useState('')
  const [ myNotes, setMyNotes ] = useState('')
  const [ myImg, setMyImg ] = useState('')
  const [selectPlanModalIsOpen, setSelectPlanModalIsOpen] = useState(false)
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false)

  //get userID from Localstorage(user ID)
  const user = localStorage.getItem('user')
  const you = JSON.parse(user)
  const userID = you._id
  
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
    <div className='account-modal'>
        <h2>Account Settings</h2>
        <div className="account-setting-box">
            <section className="section-profile-edit">
              <div className="my-profile-box">
            
                { !myImg ? <div className="no-img-onprofile"><p>No image</p></div> : <img src={ myImg } alt="user-img" />}
            
                <div className='connection-box'>
                  <i className='icon-connection'></i>
                  <p>{ myClients }</p>
                  <p>Connections</p>
                </div>
                <div className="event-box">
                  <i className='icon-calendar'></i>
                  <p>{ myEvents }</p>
                  <p>Events</p>
                </div>
                <div className="note-box">
                  <i className='icon-note'></i>
                  <p>{ myNotes }</p>
                  <p>Notes</p>
                </div>
              </div>
                <button className="edit-profile-btn btn btn-primary-reverse" onClick={() => setEditProfileModalIsOpen(true)}>Edit Profile</button>
                <Modal isOpen={editProfileModalIsOpen} className="edit-profile-modal-modal">
                  <EditProfile onEditProfile={editProfileModalIsOpen} OnsetEditProfile={setEditProfileModalIsOpen}/>
                </Modal>
            </section>
            
            <section className="section-passwordSecurity">
                <div className="title-icon">
                    <i className='icon-security'></i>
                    <h3>Password & Security</h3>
                </div>
                <p>Manage your info, privacy and security to make Credence work better for you.</p>
                <button className='manage-security-btn btn btn-primary-reverse'>Manage</button>
                
            </section>
            
            <section className="section-subscription">
                <div className="title-icon">
                    <i className='icon-subscription'></i>
                    <h3>Subscription</h3>
                </div>
                <p>You are currenty on our <span>30-day trial</span>.Go Premium to enjoy our most-loved premium features.</p>
                <button className='go-premiun-btn btn btn-primary' onClick={() => setSelectPlanModalIsOpen(true)}>Go Premium</button>
                <Modal isOpen={selectPlanModalIsOpen}>
                    <SelectPlan selectPlanIsOpen={selectPlanModalIsOpen} onsetselectPlanIsOpen={setSelectPlanModalIsOpen}/>
                </Modal>
                
            </section>
        </div>
    </div>
  )
}

export default AccountSettings

