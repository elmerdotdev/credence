import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)
    const { dispatch } = useAuthContext()
  
    
    const login = async (email, password, lastLoggedIn) => {
        setIsLoading(true)
        setError(null)
        
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await res.json()
        
        const yourID = json._id
        
        lastLoggedIn = new Date()

        const loginDate = {
            lastLoggedIn: lastLoggedIn
        }  

        //update last loggedin date in DB
        await fetch(`${process.env.REACT_APP_API_URL}/api/users/${yourID}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginDate)
        })
         
        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            //save login userID in local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {login, error}
}
