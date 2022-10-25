import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'



const GoogleLoginButton = () => {
   //local storageにDataを入れる。Logindataがあれば、Localstorageに入れてね、なければNull
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    )

    //initialize client
    //*call client when render everytime
    //Gabi connect to google API using clientId
    const clientId = '547905985542-hpkdjki1hs3dlh6r221i6bdsc8shm5e3.apps.googleusercontent.com';
    

    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         })
    //     }
    //     gapi.load('client:auth2', initClient)
    // },[])
    
    //Result display function
    const handleLogin = async (googleData) => {
        console.log('Google login success',googleData)

        const res = await fetch('http://localhost:5002/api/users/googlelogin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname:googleData.profileObj.givenName,
                lastname:googleData.profileObj.familyName,
                email:googleData.profileObj.email,
                photo:googleData.profileObj.imageUrl,
                password:googleData.tokenObj.login_hint,
                token:googleData.tokenId
            })
        })
        
        const data = await res.json()
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data))

    } 
    const handleFaile = (err) => {
        console.log('Google login failed', err)
    }

   

    return (
    <div className='google-login-button'>
      {/* Press button = send login request to clientID */}
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={handleLogin}
        onFaile={handleFaile}
        cookiePolicy={'single_host_origin'}
        //This keep the user signed in by calling onSuccess callback!
        isSignedIn={true}
      />
    </div>
  )
}

export default GoogleLoginButton


