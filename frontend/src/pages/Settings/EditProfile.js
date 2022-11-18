import React, {useState, useEffect} from 'react'
import Modal from "react-modal"


const EditProfile = (props) => {
    //Modal before submit
    const {onEditProfile, OnsetEditProfile} = props;
    //Modal after submit
    const [editModal, setEditModal ] = useState(false)
    //input areas
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')

    //get userID from Localstorage(user ID)
    const userID = JSON.parse(localStorage.getItem('user'))._id

    //page close in editModal
    const closepage = () => {
        OnsetEditProfile(false)
        setEditModal(false)
    }

    //Fetch original user Info
    useEffect(() => {
        const getProfile = async () => {
          const res = await fetchProfile()
          setFirstName(res.firstname)
          setLastName(res.lastname)
          setEmail(res.email)
          setPhoto(res.photo)
        }
    
        getProfile();
    },[])
    
    const fetchProfile = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userID}`);
      const data = await res.json();  

      if(res.ok) {
        return data 
      }
    }

    //EDIT new profile
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const editing = async(firstname, lastname, email, photo) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userID}`, {
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname, lastname, email, photo})
        })
        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            setIsLoading(false)
        }
    }
    
    //Edit submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        await editing(firstName, lastName, email, photo)
        console.log(`New Profile:` + firstName, lastName, email, photo)

    }

    //picture upload
    const photoUpdate = (e) => {
        const newphoto = URL.createObjectURL(e.target.files[0])
        setPhoto(newphoto)
    }


  return (
    <div className='editProfile-modal'>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            
            <div className="add-photo-area" >
                { !photo ? <div className="no-img-onprofile"><p>Add New Image</p></div> : <img src={ photo } alt="user-img" />}
            </div>
            <div className="choose-file-area">
                <input type="file" accept="image/*"  onChange={photoUpdate} />
            </div>

            <div className="input-area">
                <label htmlFor="firstname" >First Name / Nickname</label>
                <input  type="text"
                        htmlFor="firstname"
                        placeholder={firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="input-area">
                <label htmlFor="lastname">Last Name</label>
                <input  type="text"
                        htmlFor="lastname"
                        placeholder={lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="input-area">
                <label htmlFor="email">Email</label>
                <input  type="email"
                        htmlFor="email"
                        placeholder={email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="edit-btn-area"><button type="submit" onClick={() => setEditModal(true)} className="edit-profile-btn btn btn-primary">Edit Profile</button></div>
        </form>

            <Modal isOpen={editModal} className="submitted-editprofile-modal">
                <div className="modal-box">
                    <h2>Your New Account</h2>
                    <img src={photo} alt="new-userimg" />
                    <div className="result-area">
                        <p>First Name/ Nickname: {firstName}</p>
                        <p>Last Name: {lastName}</p>
                        <p>Email: {email}</p>
                    </div>
                    <button onClick={closepage} className="submitted-editprofile-btn btn btn-primary-reverse">Close</button>
                </div>
            </Modal>
      
    </div>
  )
}

export default EditProfile
