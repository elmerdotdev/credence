import { useState } from 'react'

export const useSignup = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const signup = async (firstname, lastname, email, password, lastLoggedIn ) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname, lastname, email, password, lastLoggedIn})
        })
        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            //save signup user to local storage with json format
            localStorage.setItem('user', JSON.stringify(json))

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}