import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)
    // const [ user, setUser ] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
        const json = await res.json()

      
    //     const addLoginDate = async (lastLoggedIn) => {
    //           //Set & add Last Login date 
    //         lastLoggedIn = new Date();
    //         console.log(lastLoggedIn)
            
    //         const res = await fetch('http://localhost:5000/api/users/login',{
    //             method:'PATCH',
    //             headers: {'Content-Type': 'application/json'},
           
    //         body: JSON.stringify({lastLoggedIn})
    //     })
        
    //     const date = await res.json(lastLoggedIn)

    //     // addLoginDate([...user,date])
    //     setLastLoggedIn(date)
        
    // }
        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            //save login user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    // const addLoginDate = async (lastLoggedIn) => {
    //               //Set & add Last Login date 
    //               lastLoggedIn = new Date();
    //             console.log(lastLoggedIn)
                
    //             const res = await fetch('http://localhost:5000/api/users/login',{
    //                 method:'PATCH',
    //                 headers: {'Content-Type': 'application/json'},
               
    //             body: JSON.stringify({lastLoggedIn})
    //         })
            
    //         const date = await res.json(lastLoggedIn)
    
    //         // addLoginDate([...user,date])
    //         setlastLoggedIn(date)
    //         console.log(date)
            
    //     }

    // return {login,addLoginDate, addisLoading, error}
    return {login, error}
}

