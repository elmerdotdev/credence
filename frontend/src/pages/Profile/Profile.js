import React, { useEffect, useState } from 'react'
import ProfileReportsPreview from './ProfileReportsPreview'
import '../../fontello/css/credence.css';

const Profile = () => {
  const [ myClients, setMyClients ] = useState('')
  const [ myEvents, setMyEvents ] = useState('')
  const [ myNotes, setMyNotes ] = useState('')
  const [ myImg, setMyImg ] = useState('')

  //後でuseidが接続できればuseruserIDを含むコードに戻すこと！
  
  //get userID from Localstorage(user ID)
  const userID = localStorage.getItem('user')
  console.log(userID)

  //1.Clients number
  useEffect(() => {
    const getClients = async () => {
      const res = await fetchMyConnections()
      // const myList = res.filter((client) => client.user_id === userID)
      const myList = res.filter((client) => client.user_id === '633b6a81145c9d79405c54ea')
      setMyClients(myList.length)
    }

    getClients();
  },[])

  //Fetch Clients Number
  const fetchMyConnections = async () => {
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/633b6a81145c9d79405c54ea`);
    const data = await res.json();  

    if(res.ok) {
      return data 
    }
  }
  console.log(myClients)

  //2.Events number
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetchMyEvents()
      // const mySchedule = res.filter((activity) => activity.user_id === userID)
      const mySchedule = res.filter((activity) => activity.user_id === '633b6a81145c9d79405c54ea')
      setMyEvents(mySchedule.length)
    }

    getEvents();
  },[])

  //Fetch Events Number
  const fetchMyEvents = async () => {
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/633b6a81145c9d79405c54ea`);
    const data = await res.json();      
    if(res.ok) {
      return data 
    }
  }
  console.log(myEvents)

  //3.Notes number
  useEffect(() => {
    const getNotes = async () => {
      const res = await fetchMyNotes()
      // const myMemo = res.filter((note) => note.user_id === userID)
      const myMemo = res.filter((note) => note.user_id === '633b6a81145c9d79405c54ea')
      setMyNotes(myMemo.length)
    }

    getNotes();
  },[])

  //Fetch Memo Number
  const fetchMyNotes = async () => {
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${userID}`);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/633b6a81145c9d79405c54ea`);
    const data = await res.json();  

    if(res.ok) {
      return data 
    }
  }
  console.log(myNotes)

  //4.User Image
   useEffect(() => {
    const getImg = async () => {
      const res = await fetchMyImg()
      const myPicture = res.filter((user) => user._id === `ObjectId('${userID}')`)
      setMyNotes(myPicture.photo)
    }

    getImg();
  },[])
  //Fetch My Img
  const fetchMyImg = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userID}`);
    const data = await res.json();  

    if(res.ok) {
      return data 
    }
  }
  console.log(myImg)


  return (
    <>
      <div className="page-profile">
      <section className="page-profile-edit">
            <img src={ myImg } alt="user-img" />

            <i className='icon-connection'></i>
            <p>{ myClients }</p>
            <p>connections</p>

            <i className='icon-calendar'></i>
            <p>{ myEvents }</p>
            <p>events</p>

            <i className='icon-note'></i>
            <p>{ myNotes }</p>
            <p>notes</p>

            <button>Edit Profile</button>
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

        <ProfileReportsPreview/>
      </div>
    </>
  )
}

export default Profile
