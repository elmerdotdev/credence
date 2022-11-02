import React, { useEffect, useState } from 'react'
import ProfileReportsPreview from './ProfileReportsPreview'


const Profile = () => {
  const [ allClients, setAllClients ] = useState([])
  const [ myClientArray, setMyClientArray ] = useState([])
  const [ myClientNbr, setMyClientNbr ] = useState(null)
 
 
  //get userID from Localstorage(user ID)
  const userID = localStorage.getItem('user')
  console.log(userID)

  //====Fetch Connection(このIDが入っているクライアントの数)====
  useEffect(() => {
    const getClients = async () => {
      const res = await fetchMyConnections();
      setAllClients(res);
    }

    getClients();
  },[])

  //user＿idを入れるけれどこれがなんのIDなのかを確認すること(user＿idなのかそれとも_idなのか？）
  const fetchMyConnections = async () => {
    // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/633b6a81145c9d79405c54ea`)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/getClients`);
    const data = await res.json();  
   
    if(res.ok) {
      return data
      
    }
  }
    // setAllClients([...allClients, data])
  
   

  console.log(allClients)

  //ここのMapがなんでダメなのか聞くこと！
  //   allClients.map((client) =>
  //   client.user_id === '633b6a81145c9d79405c54ea' ? {...myClientArray,client } : console.log('empty') )
   
  // console.log(myClientArray)
  

  //Fetch Events
  //このUserのIDガハイッテイルeventの数
  const myEvents = async (userID) => {
   
  }
  
  
  //Fetch Notes
  //このuserのIDのIDが入っているNoteの数
  const myNotes = async (userID) => {
    
  }
  
  return (
    <>
      <div className="page-profile">
      <section className="page-profile-edit">
            <img src="" alt="user-img" />

            <p>{ myClientNbr }</p>
            <p>connections</p>

            <p>Number</p>
            <p>events</p>

            <p>Number</p>
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
